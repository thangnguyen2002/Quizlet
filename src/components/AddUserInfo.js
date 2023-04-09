import { useState } from "react";

const AddUserInfo = (props) => {
    const { handleAddNewUser } = props;
    const [name, setName] = useState('')
    const [address, setAddress] = useState('Bac Ninh')
    const [age, setAge] = useState('')

    const handleOnChangeInput = (e) => {
        setName(e.target.value)
    }

    const handleOnchangeAge = (e) => {
        setAge(e.target.value)
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        handleAddNewUser({
            id: Math.floor((Math.random() * 100) + 1) + '-random',
            name: name,
            age: age
        })
    }

    return (
        <>
            My name is {name} and I'm {age}
            <form onSubmit={handleOnSubmit}>
                <label>Your name: </label>
                <input type="text" value={name} onChange={handleOnChangeInput} />
                <label>Your age: </label>
                <input type="text" value={age} onChange={handleOnchangeAge}/>
                <button>Submit</button>
            </form>
        </>
    );
}

export default AddUserInfo;