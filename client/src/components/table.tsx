import { Author } from '../types/author'

type Props = {
  isLoading: boolean
  authors: Author[]
}

export default function Table({ isLoading, authors }: Props) {
  return (
    <table className="border border-solid border-gray-200 border-b-0 text-sm min-w-full">
      <Thead />
      {isLoading ? (
        <Skeleton />
      ) : !!authors.length ? (
        <tbody>
          {authors.map((row) => (
            <tr key={row.id}>
              <td className="p-3 border-b border-r border-gray-200 text-center">
                {row.id}
              </td>
              <td className="p-3 border-b border-r border-gray-200 text-center">
                {row.postId}
              </td>
              <td className="p-3 border-b border-r border-gray-200">
                {row.name}
              </td>
              <td className="p-3 border-b border-r border-gray-200">
                {row.email}
              </td>
              <td className="p-3 border-b border-gray-200">{row.body}</td>
            </tr>
          ))}
        </tbody>
      ) : (
        <tbody>
          <tr>
            <td
              colSpan={5}
              className="text-base p-3 text-center border-b border-gray-200"
            >
              Author not found
            </td>
          </tr>
        </tbody>
      )}
    </table>
  )
}

function Thead() {
  return (
    <thead className="bg-gray-100">
      <tr>
        <th className="p-3 border-b border-r border-gray-200 w-12">ID</th>
        <th className="p-3 border-b border-r border-gray-200 w-20">Post ID</th>
        <th className="p-3 text-left border-b border-r border-gray-200 w-60">
          Name
        </th>
        <th className="p-3 text-left border-b border-r border-gray-200 w-48">
          Email
        </th>
        <th className="p-3 text-left border-b border-gray-200">Body</th>
      </tr>
    </thead>
  )
}

function Skeleton() {
  return (
    <tbody>
      {Array.from(Array(10).keys()).map((_row, index) => (
        <tr key={index} className="animate-pulse">
          <td className="p-3 border-b border-r border-gray-200 text-center align-top">
            <div className="h-2 bg-slate-200 rounded" />
          </td>
          <td className="p-3 border-b border-r border-gray-200 text-center align-top">
            <div className="h-2 bg-slate-200 rounded" />
          </td>
          <td className="p-3 border-b border-r border-gray-200 space-y-2 align-top">
            <div className="h-2 bg-slate-200 rounded" />
            <div className="h-2 bg-slate-200 rounded" />
          </td>
          <td className="p-3 border-b border-r border-gray-200 align-top">
            <div className="h-2 bg-slate-200 rounded" />
          </td>
          <td className="p-3 border-b border-gray-200 space-y-2">
            <div className="h-2 bg-slate-200 rounded" />
            <div className="h-2 bg-slate-200 rounded" />
            <div className="h-2 bg-slate-200 rounded" />
          </td>
        </tr>
      ))}
    </tbody>
  )
}
