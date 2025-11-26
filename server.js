import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import Users from "./mongodbSchemas/users.js"
import Fluxo from "./mongodbSchemas/fluxo.js"
import "dotenv/config"

// CONFIGURAÇÕES NECESSÁRIAS
const app = express()
const PORT = 4000
app.use(express.json({ limit: "10mb" }))
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)

mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 50000, // aumenta para 30s
})

// Conexão com o banco de dados
const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Conectado ao MongoDB!")
  } catch (error) {
    console.log("Erro ao conectar ao banco:")
    console.log(error)
  }
}
connection()



app.post("/createuser", async (req, res) => {
  const { name, password } = req.body

  try {
    const login = await Users.find({
      name: name,
      password: password,
    })
    if (login.length > 0) {
      return res.status(400).send("Usuario ja existe")
    }
    const crateUser = await Users.create({ name, password })
    res.send(crateUser)
  } catch (error) {
    console.log(error)
    res.status(500).send("Erro ao buscar")
  }
})

app.post("/login", async (req, res) => {
  const { name, password } = req.body
  try {
    const login = await Users.findOne({
      name: name,
      password: password,
    })
    
    if (!login) {
      return res.json({ status: false })
    }
    const id = login._id.toString()
    
    return res.json({ usuario: id, status: true, photo: login.profilePhoto })
  } catch (error) {
    console.log(error)
    res.status(500).send("Erro ao buscar")
  }
})

app.post("/getfluxo", async (req, res) => {
  const { date, usuario } = req.body
  const ano = String(new Date(date).getFullYear())
  const mes = new Date(date).toLocaleString("pt-BR", { month: "long" })

  try {
    const fluxo = await Fluxo.find({
      mes: mes,
      ano: ano,
      userID: usuario,
    })
    return res.json(fluxo)
  } catch (error) {
    console.log(error)
    res.status(500).send("Erro")
  }
})

app.post("/addfluxo", async (req, res) => {
  try {
    const ano = String(new Date(req.body.data).getFullYear())
    const mes = new Date(req.body.data).toLocaleString("pt-BR", {
      month: "long",
    })
    req.body.ano = ano
    req.body.mes = mes
    if (req.body.tipo === "Entrada") {
      req.body.categoria = ""
    }
    const addfluxo = await Fluxo.create(req.body)
    console.log("Adicionado com sucesso")
    return res.status(200).send("Adicionado com sucesso")
  } catch (error) {
    console.log(error)
    res.status(500).send("Erro")
  }
})

app.post("/editarfluxo", async (req, res) => {
  try {
    const ano = String(new Date(req.body.data).getFullYear())
    const mes = new Date(req.body.data).toLocaleString("pt-BR", {
      month: "long",
    })
    req.body.ano = ano
    req.body.mes = mes
    if (req.body.tipo === "Entrada") {
      req.body.categoria = ""
    }
    const editfluxo = await Fluxo.updateOne(
      { _id: req.body._id },
      { $set: { ...req.body } }
    )
    console.log("editado com sucesso")
    return res.status(200).send("Adicionado com sucesso")
  } catch (error) {
    console.log(error)
    res.status(500).send("Erro")
  }
})

app.post("/deletefluxo", async (req, res) => {
  try {
    const deletado = await Fluxo.deleteOne({ _id: req.body._id })

    if (deletado.deletedCount === 0) {
      console.log("item nao encontrado")
      return res.status(404).send("Item não encontrado")
    }
    console.log("item deletado com sucesso")

    res.send("Fluxo deletado com sucesso!").status(200)
  } catch (err) {
    console.log(err)
    res.status(500).send("Erro ao deletar")
  }
})

app.post("/update-photo", async (req, res) => {
  try {
    const { userId, photo } = req.body

    const updatePhoto = await Users.updateOne(
      { _id: userId },
      { profilePhoto: photo }
    )
    console.log(updatePhoto)
    res.json({ ok: true })
  } catch (error) {
    console.log(error)
    res.status(500).send("Erro ao deletar")
  }
})

app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT)
})
