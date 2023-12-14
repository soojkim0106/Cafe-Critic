import { useEffect, useState } from "react"
import Subjectcard from "./Subjectcard"



export default function Home(){
    const [subject, setSubject] = useState([])
        useEffect(()=>{
            fetch('/subjects')
            .then((resp)=>{
                if (resp.ok){
                    resp.json().then(setSubject)
                } else {
                    console.log('error')
                }
            })
        },[])
        const subjectCard = subject.map((subObject)=> {
            return <Subjectcard key={subObject.id} subject={subObject}/>
        })
    return (
        <div>
            {subjectCard}
        </div>
    )
}