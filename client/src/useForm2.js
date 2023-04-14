import { useState } from "react"

export const useForm2=(values)=>{
        const [val, setVal] = useState(values)
       
        
        return[val,event=>{
            setVal({
                ...val,
                [event.target.name]:event.target.value
            })
        }]
}