import './App.css';
import { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {addUserAction, updateUserAction, deleteUserAction, filterUserAction, clearFilterUserAction} from './Config/actions'
function App() {
  const villes = useSelector(data=>data.villes);
  const users = useSelector(data=>data.users);
  const usersFilter = useSelector(data=>data.usersFilter);
  const listeusersmap = usersFilter ? usersFilter : users; 
  const indexUser = users.length;
  const [id, setId] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [ville, setVille] = useState(1);
  const [villeFilter, setVilleFilter] = useState(1);
  const dispatch = useDispatch()
  const handleEnregistrer = () => {
    dispatch(addUserAction({ id:indexUser+1, nom:nom, prenom:prenom, ville:parseInt(ville) }))
    handleClear()
  }
  const handleClear = () => {
    setNom("")
    setPrenom("")
    setVille(1)
  }
  const handleRemplirForm = (id) => {
    const user = users.find((u)=>u.id===parseInt(id))
    setId(id)
    setNom(user.nom)
    setPrenom(user.prenom)
    setVille(parseInt(user.ville))
  }
  const handleModifier = () => {
    dispatch(updateUserAction({ id:id, nom:nom, prenom:prenom, ville:ville }))
    handleClear()
    setId("")
  }
  const handleDelete = (id) => {
    dispatch(deleteUserAction(id))
  }
  const handleFilter = () => {
    dispatch(filterUserAction(villeFilter))
  }
  const handleFilterClear = () => {
    dispatch(clearFilterUserAction(villeFilter))
  }
  return (
    <div style={{paddingLeft:40}}>
      <h1>CRUD REACT-REDUX Example 2</h1>
      <div>
        <label>Nom</label>
        <input type="text" value={nom} onChange={(e)=>setNom(e.target.value)} />
        <label>Prénom</label>
        <input type="text" value={prenom} onChange={(e)=>setPrenom(e.target.value)} />
        <label>Ville</label>
        <select value={ville} onChange={(e)=>setVille(e.target.value)}>
          {villes.map((ville, i)=><option key={i} value={ville.id}>{ville.nom}</option>)}
        </select>
        {id?<button onClick={()=>handleModifier()}>Modifier</button>
        :<button onClick={()=>handleEnregistrer()}>Enregister</button>}
        <button onClick={()=>handleClear()}>Clear</button>
      </div>
      <div>
        <label>Filtrer par ville</label>
        <select value={villeFilter} onChange={(e)=>setVilleFilter(e.target.value)}>
          {villes.map((ville, i)=><option key={i} value={ville.id}>{ville.nom}</option>)}
        </select>
        <button onClick={()=>handleFilter()}>Filtrer</button>
        <button onClick={()=>handleFilterClear()}>Clear</button>
      </div>
      <table>
        <thead>
          <tr>
            <td>Id</td>
            <td>Nom</td>
            <td>Prenom</td>
            <td>Ville</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {listeusersmap.map((user,index)=> {
            const ville = villes.find((v)=>v.id===parseInt(user.ville))
            return (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.nom}</td>
                <td>{user.prenom}</td>
                <td>{ville.nom}</td>
                <td>
                  <button onClick={()=>handleRemplirForm(user.id)}>Modifier</button>
                  <button onClick={()=>handleDelete(user.id)}>Supprimer</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
