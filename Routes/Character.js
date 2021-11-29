const Express = require('express')
const Router = Express.Router()
const Model = require('../Models/Character.js')
const Routes = require('../Miscs.js').Routes

const Dir = 'Character/'
const No_Character = {
    Message: "There is no character with that ID."
}

Router.get('/', async (req, res) => {
    // return res.send('Heya.')

    const Characters = await Model.find()
    return res.status(200).render(Dir + 'Add-Character.ejs', {
        Data: Characters, Route: 'characters', Routes: Routes
    })
})

// Add & View ~ 11/5/22; November 5, 2021

Router.get('/:id', async (req, res) => {
    const ID = parseInt(req.params.id)
    const Character = await Model.findOne({ ID: ID })

    if (!Character) return res.status(404).json(No_Character)

    // Write(Character.ID)
    
    return res.status(200).render(Dir + 'View-Character.ejs', {
        Character: Character, Routes: Routes
    })
})

Router.post('/new', (req, res) => {
    const Name = req.body.Name
    // Write(Name)

    const ID = parseInt(Date.now().toString())
    
    Model.create(
        {
            Name: Name,
            ID: ID
        }
    )
    // Write(Character)

    return res.status(201).redirect('/characters')
})

// Remove ~ 11/21/21; November 21, 2021

Router.delete('/remove/:id', async (req, res) => {
    const ID = parseInt(req.params.id)
    const Character = await Model.findOneAndDelete({ ID: ID })

    if (!Character) return res.status(404).json(No_Character)
    
    return res.status(200).redirect('/characters')
})

// Edit ~ 11/22/21; November 22, 2021

Router.get('/edit/:id', async (req, res) => {
    const ID = parseInt(req.params.id)
    const Character = await Model.findOne({ ID: ID })

    if (!Character) return res.status(404).json(No_Character)

    return res.status(200).render(Dir + 'Edit-Character.ejs', {
        Character: Character, Routes: Routes
    })
})
Router.post('/edit/:id', async (req, res) => {
    // Add Field

    const ID = parseInt(req.params.id)
    const Label = req.body.Label
    const Value = req.body.Value

    const Character = await Model.findOne({ ID: ID })
    if (!Character) return res.status(201).redirect('/characters/edit/' + ID)
    
    Character.Fields.push(
        {
            Label: Label,
            Value: Value,
            ID: Character.Fields.length + 1
        }
    )
    Character.save()

    return res.status(201).redirect('/characters/edit/' + ID)
})
Router.patch('/edit/:id', async (req, res) => {
    const Name = req.body.Name
    const ID = parseInt(req.params.id)

    const Character = await Model.findOneAndUpdate(
        { ID: ID }, { Name: Name }
    )
    if (!Character) return res.status(404).json(No_Character)

    return res.status(204).redirect('/characters')
})

module.exports = Router