import React from 'react'
import Table from './Table'


function CourseManage({years}){
    return(<div>
        <p>년도 <select name="year">
            {years.map(year => (
                <option value={year}>{year}</option>
            ))}</select></p>
        <p>학기 <select name="semester"><option value="1">1</option><option value="2">2</option></select></p>
        <Table />
    </div>
    );
}

export default CourseManage;