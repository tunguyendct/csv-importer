import { PrismaClient } from '@prisma/client'
import { parse } from 'fast-csv'
import { createReadStream } from 'fs'

const prisma = new PrismaClient()

const upload = async (req, res) => {
  try {
    if (req.file == undefined || req.fileValidationError) {
      return res.status(400).send(req.fileValidationError)
    }

    let authors = []
    let path = './uploads/' + req.file.filename

    createReadStream(path)
      .pipe(parse({ headers: true }))
      .on('error', (error) => {
        throw error.message
      })
      .on('data', (row) => {
        authors.push({
          ...row,
          id: +row.id,
          postId: +row.id,
        })
      })
      .on('end', async () => {
        // Clean old data before create new
        const deleteAuthors = await prisma.author.deleteMany({})
        if (!deleteAuthors) {
          return res.status(500).send({
            status: 'error',
            message: 'Failed to upload file',
          })
        }

        // Write data to database
        const authorsResp = await prisma.author.createMany({
          data: authors,
        })

        if (!authorsResp) {
          return res.status(500).send({
            status: 'error',
            message: 'Failed to upload file',
          })
        }

        return res.status(200).send({
          message:
            'The file: ' +
            req.file.originalname +
            ' got uploaded successfully!!',
        })
      })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 'error',
      message: 'Failed to upload the file: ' + req.file.originalname,
    })
  }
}

export default {
  upload,
}
