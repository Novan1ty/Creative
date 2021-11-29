const Express = require('express')
const Router = Express.Router()
const Model = require('../Models/Realm.js')
const Routes = require('../Miscs.js').Routes

const Dir = 'Realm/'
const No_Realm = {
    Message: "There is no realm with that ID."
}

Router.get('/', async (req, res) => {
    const Realms = await Model.find()
    return res.status(200).render(Dir + 'Add-Realm.ejs', {
        Data: Realms, Route: 'realms', Routes: Routes
    })
})

Router.get('/:id', async (req, res) => {
    const ID = req.params.ID
    const Realm = await Model.findOne({ ID: Number(ID) })

    if (!Realm) return res.status(404).json(No_Realm)

    return res.status(200).render(Dir + 'View-Realm.ejs', {
        Realm: Realm, Routes: Routes
    })
})

Router.post('/new', (req, res) => {
    const Name = req.body.Name

    const ID = Date.now().toString()
    const Realm = {
        Name: Name,
        ID: Number(ID)
    }
    
    Model.create(Realm)
    return res.status(201).redirect('/realms')
})

Router.delete('/remove/:id', async (req, res) => {
    const ID = parseInt(req.params.id)
    const Realm = await Model.findOneAndDelete({ ID: ID })

    if (!Realm) return res.status(404).json(No_Realm)
    
    return res.status(200).redirect('/realms')
})

Router.get('/edit/:id', async (req, res) => {
    const ID = parseInt(req.params.id)
    const Realm = await Model.findOne({ ID: ID })

    if (!Realm) return res.status(404).json(No_Realm)

    return res.status(200).render(Dir + 'Edit-Realm.ejs', {
        Realm: Realm, Routes: Routes
    })
})
Router.patch('/edit/:id', async (req, res) => {
    const Name = req.body.Name
    const ID = parseInt(req.params.id)

    const Realm = await Model.findOneAndUpdate(
        { ID: ID }, { Name: Name }
    )
    if (!Realm) return res.status(404).json(No_Realm)

    return res.status(204).redirect('/realms')
})
Router.post('/edit/:id', async (req, res) => {
    const ID = parseInt(req.params.id)
    const Label = req.body.Label
    const Value = req.body.Value

    const Realm = await Model.findOne({ ID: ID })
    if (!Realm) return res.status(201).redirect('/realms/edit/' + ID)
    
    Realm.Fields.push(
        {
            Label: Label,
            Value: Value,
            ID: Realm.Fields.length + 1
        }
    )
    Realm.save()

    return res.status(201).redirect('/realms/edit/' + ID)
})

module.exports = Router