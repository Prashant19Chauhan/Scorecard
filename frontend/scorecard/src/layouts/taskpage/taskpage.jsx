import './taskpage.scss'

function taskpage() {
  return (
    <div>
      <div className='taskpage'>
        <div className='taskpageheader'>
            <div className='taskpageheading'>
                <h2>Task of the day for Subject 1</h2>
            </div>
            <div className='NewSubjectBtn'>
                <button>+ New Subject</button>
            </div>
        </div>
        <div className='divider'></div>
            <div className='taskshow'>
                <div className='ToDoTask'>
                    <div className='ToDoTaskBar'>
                        <h3>To-Do task</h3>
                        <button>+</button>
                    </div>
                    <div className='TaskCardContainer'>
                        <div className='TaskCard'>
                            <img></img>
                            <h5>Task 1</h5>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit commodi, accusamus numquam obcaecati iure neque deserunt nam perspiciatis vitae! Ullam, voluptate fuga. Velit aliquid eveniet repellat voluptatibus, odit facere reiciendis?</p>
                            <button>View Task</button>
                        </div>
                        
                    </div>
                </div>
                <div className='CompletedTask'>
                    <div className='ToDoTaskBar'>
                        <h3>Completed task</h3>
                        <button>+</button>
                    </div>
                    <div className='TaskCardContainer'>
                        <div className='TaskCard'>
                            <img></img>
                            <h5>Task 1</h5>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit commodi, accusamus numquam obcaecati iure neque deserunt nam perspiciatis vitae! Ullam, voluptate fuga. Velit aliquid eveniet repellat voluptatibus, odit facere reiciendis?</p>
                            <button>View Task</button>
                        </div>
                    </div>
                </div>
                <div className='workInProgress'>
                    <div className='ToDoTaskBar'>
                        <h3>In Progress task</h3>
                        <button>+</button>
                    </div>
                    <div className='TaskCardContainer'>
                        <div className='TaskCard'>
                            <img></img>
                            <h5>Task 1</h5>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit commodi, accusamus numquam obcaecati iure neque deserunt nam perspiciatis vitae! Ullam, voluptate fuga. Velit aliquid eveniet repellat voluptatibus, odit facere reiciendis?</p>
                            <button>View Task</button>
                        </div>
                    </div>
                </div>
                <div className='Pendingtask'>
                    <div className='ToDoTaskBar'>
                        <h3>Pending task</h3>
                        <button>+</button>
                    </div>
                    <div className='TaskCardContainer'>
                        <div className='TaskCard'>
                            <img></img>
                            <h5>Task 1</h5>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit commodi, accusamus numquam obcaecati iure neque deserunt nam perspiciatis vitae! Ullam, voluptate fuga. Velit aliquid eveniet repellat voluptatibus, odit facere reiciendis?</p>
                            <button>View Task</button>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    </div>
  )
}

export default taskpage
