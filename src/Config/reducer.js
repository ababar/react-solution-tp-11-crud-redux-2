const initialeState = { 
    villes:[ 
        {id:1, nom:"Agadir"}, 
        {id:2, nom:"Rabat"}, 
        {id:3, nom:"Casablanca"}, 
    ], 
    users:[ 
        {id:1,nom:"Allaoui",prenom:"Moahemd",ville:2}, 
        {id:2,nom:"Benani",prenom:"Hind",ville:1} 
    ] 
}
const reducer = (state=initialeState, action) => {
    switch(action.type) {
        case "Add_User":
            return {...state, users:[...state.users, action.payload]}
        case "Update_User":
            const user = state.users.find((u)=>u.id===parseInt(action.payload.id))
            if (user) {
                user.nom = action.payload.nom
                user.prenom = action.payload.prenom
                user.ville = parseInt(action.payload.ville)
            }
            return state
        case "Delete_User":
            return {...state, users:[...state.users.filter((u)=>u.id!==parseInt(action.payload))]}
        case "Filter_User":
            console.log(state)
            console.log({...state, usersFilter:[...state.users.filter((u)=>u.ville===parseInt(action.payload))]})
            return {...state, usersFilter:[...state.users.filter((u)=>u.ville===parseInt(action.payload))]}
        case "Clear_Filter_User":
            return {...state, usersFilter:null}
        default:
            return state
    }
}
export default reducer