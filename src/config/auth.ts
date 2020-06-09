enum Role {
    PACIENTE = "PACIENTE",
    PROFISSIONAL = "PROFISSIONAL",
    ADMIN = "ADMIN"
}

export default {
    secret_key: process.env.APP_KEY,
    expiresIn: "7d",
    role: Role
}