import React, { useEffect } from "react";
import SearchBox from '../components/SearchBox'
import CardList from "../components/CardList";
import Scroll from '../components/Scroll'
import ErrorBoundry from '../components/ErrorBoundry'
import './App.css'
import { setSearchField, requestRobots } from '../actions'
import { useSelector, useDispatch } from "react-redux";

function App() {

    const dispatch = useDispatch()

    const robots = useSelector((state) => state.requestRobots.robots)
    const isPending = useSelector((state) => state.requestRobots.isPending)
    const searchField = useSelector((state) => state.searchRobots.searchField)
    const onSearchChange = (event) => {
        dispatch(setSearchField(event.target.value))
    }

    useEffect(() => {
        dispatch(requestRobots())
    },[])

        const filteredRobtos = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase())
        })
            return isPending ?
            <h1 className='tc'>Loading</h1> :
            (
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={onSearchChange}/>
                    <Scroll>
                        <ErrorBoundry>
                          <CardList robots={filteredRobtos}/>
                        </ErrorBoundry>
                    </Scroll>
            </div>
        );
        
    }

export default App;