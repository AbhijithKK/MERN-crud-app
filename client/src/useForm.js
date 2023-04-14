import { useState } from "react"

export const useForm=(initalVal)=>{
const [values, setValues] = useState(initalVal)

return[values,event=>{
    setValues({
        ...values,
        [event.target.name]:event.target.value
    })
}]

}