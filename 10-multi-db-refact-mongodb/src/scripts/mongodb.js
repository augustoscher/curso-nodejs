
// docker exec -it mongodb \
//   mongo -u admin -p senhaadmin --authenticationDatabase admin

//> mongo --host localhost -u admin -p senhaadmin --authenticationDatabase admin
//> db.getSiblingDB('heroes').createUser({user: 'augustoscher', pwd: 'minhasenhasecreta', roles: [{role: 'readWrite', db: 'heroes'}]})

//npm install mongoose

//mostrar databases
//show dbs

//configurando o contexto para heros db
//use heroes

//mostrar collections
//show collections

//find
db.heroes.find({}).limit(1000).sort({"_id": 1 })
db.heroes.find({}, {"_id": 0}).limit(1000).sort({"_id": 1 })

//insert
db.heroes.insert({name: 'Flash', power: 'Speed', birthDate: new Date()})

for (let i = 0; i<100000; i++){
    db.heroes.insert({name: `Clone${i+1}`, power: 'Speed', birthDate: new Date()})
}

//update
db.heroes.update({name: 'Clone100'}, {name: 'Batman', power: 'Money'})

//Update just one attribute. If attribute dont eixsts, it'll be created
db.heroes.update({name: 'Clone101'}, { $set: { name: 'Captain America'}})

//Updates only first occurence. To update all we need to add {multi: true}
db.heroes.update({power: 'Speed'}, { $set: { power: 'Super Strength'}})

//delete
db.heroes.remove({name: 'Clone999'})
