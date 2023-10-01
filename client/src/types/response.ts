export type Status = "success" | "fail" | "error";

export type Error = {
  status: Status,
  message: String
}

// Convention: https://github.com/omniti-labs/jsend
