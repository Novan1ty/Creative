const Express = require('express')
const Router = Express.Router()
const Model = require('../Models/Item.js')
const { Routes } = require('../Miscs.js')

const Dir = 'Item/'
const No_Item = {
    Message: "There is no item with that ID."
}

Router.get('/', async (req, res) => {
    const Items = await Model.find()
    return res.status(200).render(Dir + 'Add-Item.ejs', {
        Data: Items, Route: 'items', Routes: Routes
    })
})

Router.get('/:id', async (req, res) => {
    const ID = parseInt(req.params.id)
    const Item = await Model.findOne({ ID: ID })

    if (!Item) return res.status(404).json(No_Item)
    return res.status(200).render(Dir + 'View-Item.ejs', {
        Item: Item, Routes: Routes
    })
})

Router.post('/new', (req, res) => {
    const Name = req.body.Name
    const ID = parseInt(Date.now().toString())
    
    Model.create(
        {
            Name: Name,
            ID: ID
        }
    )
    return res.status(201).redirect('/items')
})

Router.delete('/remove/:id', async (req, res) => {
    const ID = parseInt(req.params.id)
    const Item = await Model.findOneAndDelete({ ID: ID })

    if (!Item) return res.status(404).json(No_Item)
    return res.status(200).redirect('/items')
})

Router.get('/edit/:id', async (req, res) => {
    const ID = parseInt(req.params.id)
    const Item = await Model.findOne({ ID: ID })

    if (!Item) return res.status(404).json(No_Item)
    return res.status(200).render(Dir + 'Edit-Item.ejs', {
        Item: Item, Routes: Routes
    })
})
Router.post('/edit/:id', async (req, res) => {
    const ID = parseInt(req.params.id)
    const Label = req.body.Label
    const Value = req.body.Value
    const Original = '/items/edit/' + ID

    const Item = await Model.findOne({ ID: ID })
    if (!Item) return res.status(400).redirect(Original)
    
    Item.Fields.push(
        {
            Label: Label,
            Value: Value,
            ID: Item.Fields.length + 1
        }
    )
    Item.save()

    return res.status(201).redirect(Original)
})
Router.patch('/edit/:id', async (req, res) => {
    const Name = req.body.Name
    const ID = parseInt(req.params.id)

    const Item = await Model.findOneAndUpdate(
        { ID: ID }, { Name: Name }
    )
    if (!Item) return res.status(400).json(No_Item)

    return res.status(204).redirect('/items')
})

module.exports = Router