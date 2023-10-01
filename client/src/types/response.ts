export type Status = "success" | "fail" | "error";

export type Error = {
  status: Status,
  message: String
}

// Reference: https://github.com/omniti-labs/jsend
