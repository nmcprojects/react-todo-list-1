import React from 'react'
import './TaskItem.css'

function TaskItem(props) {

    const [checked, setChecked] = React.useState(props.task.checked)

    const textInfo = React.useRef()

    const handleCheckboxChange = () => {

        const newChecked = checked ? null : 'checked';

        setChecked(newChecked);

        props.handleCheckboxChange(props.task.id, newChecked);
    }

    const runWord = () => {
        if(textInfo.current.scrollWidth > textInfo.current.clientWidth) {
            const t = 0 - textInfo.current.innerText.length
            const currentWidth = textInfo.current.clientWidth
            textInfo.current.style.overflow = 'visible'
            textInfo.current.style.transform = `translateX(calc(${t}ch + ${currentWidth}px)`;

        } 
    }

    const resetCss = () => {
        const t = 0 - textInfo.current.innerText.length
        textInfo.current.style.transform = `none`;
        setTimeout(() => {
            textInfo.current.style.overflow = 'hidden';
        }, 5000)
    }

    return (
        <div className="task-item">
            <label className="checkbox">
                <input type="checkbox" onChange={handleCheckboxChange} defaultChecked={checked}/>
                <span className="checkmark"></span>
            </label>
            <p className="task-info" ref = {textInfo} data-checked={props.task.checked} onMouseOver={runWord} onMouseOut={resetCss}>{props.task.work}</p>
            <p className="task-time">{props.task.timer}</p>
        </div>
    )
}

export default TaskItem
