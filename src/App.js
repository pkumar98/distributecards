import React, { useState } from 'react';
import CARDS from './constant'
import 'bulma/css/bulma.css';

function App() {
    const [people, setPeople] = useState(0)
    const [data, setData] = useState([])
    const [error, setError] = useState('')

    // update value for input text
    const onChange = (event) => {
        const { value } = event.target
        setPeople(value)
    }

    // distributes cards for every person
    const distributeCards = () => {
        const noOfPeople = +people
        const testDigits = (/^\d+/g).test(people) // check for digits only

        if(!testDigits || noOfPeople <= 0) {
            setData([])
            setError('Input Value does not exists or value is invalid')
            return
        }
        setError('')


        let obj = {}

        // create person object based on people
        for(var i=1; i<= noOfPeople; i++){
            obj[`person${i}`] = []
        }

        let currPerson = 1
        CARDS.forEach((card) => {
            obj[`person${currPerson}`].push(card)
            if(currPerson === noOfPeople) {
                currPerson = 1
            } else {
                currPerson++
            }
        })
        let arr = []
        for(var item in obj) {
            arr.push({
                name: [item][0],
                cards : obj[item]
            })
        }
        setData(arr)
    }
    return (
        <section className="section">
            <div className="container">
                <h1 className="title">
                    Distribute Cards
                </h1>
                <div className="columns">
                    <div className="column is-two-fifths">
                        <div className="field">
                            <div className="control">
                                <input className="input" type="text" placeholder="People" onChange={onChange} value={people} />
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-link" onClick={distributeCards}>Submit</button>
                            </div>
                        </div>
                    </div>
                    <div className="column" />
                </div>
                {
                    error &&
                    <article className="message is-danger">
                        <div className="message-body">
                            {error}
                        </div>
                    </article>
                }
                {
                    data.length ?
                        ( <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                        <tbody>
                        <tr>
                            <th>People</th>
                            <th>Cards</th>
                        </tr>
                        {
                            data.map((person) => {
                                return (
                                    <tr key={`${person.name}_tr`}>
                                        <td>{person.name}</td>
                                        <td>
                                            {
                                                person.cards.map((card)=>{
                                                    return `${card}, `
                                                })
                                            }
                                        </td>
                                    </tr>)
                            })
                        }
                        </tbody>
                    </table>) : null

                }
            </div>
        </section>
);
}

export default App;
