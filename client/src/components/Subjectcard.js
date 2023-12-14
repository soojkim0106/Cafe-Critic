 import { Button, Card } from "@mui/material"




export default function Subjectcard({subject}){
    const {id, type_operation} = subject
    console.log(type_operation)
    return(
        <Card id={id} >
            <div>
                <h2>{type_operation}</h2>
            </div>

            <Button>Take me to this route</Button>

        </Card>
        

    )
}