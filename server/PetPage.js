




const xurl = "http://localhost:5555"
const [pets, setPets] = useState([])

useEffect(() => {
    fetch(xurl + '/pets')
        .then(r => r.json())
        .then(setPets)
}, [])









