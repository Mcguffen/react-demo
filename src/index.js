import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './style.css'


const Cell = function(props){

  return(
    <div className="cell" onClick={props.onClick}>
      {props.text}
    </div>
  )
}


const Chessboard = function(){
  const [cells,setCells] = useState([
    [null,null,null],
    [null,null,null],
    [null,null,null],
  ])
  const [finished, setFinished] = useState(false)
  const [n, setN] = useState(0)
  const tell = (cells) => {
    console.log('tell 判断谁赢了')
    // 横着
    for(let  i=0; i<3; i++){
      if(cells[i][0] === cells[i][1] && cells[i][1] && cells[i][2] &&
        cells[i][0] != null){
          console.log(cells[i][0]+'赢了')
          setFinished(true)
          break
      }
    }
    // 竖着i
    for(let  i=0; i<3; i++){
      if(cells[0][i] === cells[1][i] && cells[1][i] && cells[2][i] &&
        cells[0][i] != null){
          console.log(cells[0][i]+'赢了')
          setFinished(true)
          break
      }
    }
    // 斜着
    
      if(
        cells[0][0] === cells[1][1] && 
        cells[1][1] === cells[2][2] &&
        cells[0][0] != null
        ){
          console.log(cells[0][0]+'赢了')
          setFinished(true)         
      }
      if(
        cells[0][2] === cells[1][1] && 
        cells[1][1] === cells[2][0] &&
        cells[1][1] != null
        ){
          console.log(cells[1][1]+'赢了')
          setFinished(true)         
      }

  }
  const onClickCell = (row,col) => {
    console.log('on click cell')
    console.log('行：'+row)
    console.log('列：'+col)
    setN(n+1)
    const copy = JSON.parse(JSON.stringify(cells))
    copy[row][col] = n % 2 === 0 ? 'X': 'O'
    setCells(copy)
    tell(copy)

  }
  return(
    <div>
      <div>n的值为：{n}</div>
      {cells.map((items,row) =><div className="row">
        {items.map((item,col)=><div className="col">
          <Cell text={item} onClick={()=>onClickCell(row,col)}/></div>)}
        </div>)}
        { finished && <div className="gameOver">游戏结束</div>}
    </div>
  )
}

ReactDOM.render(<div><Chessboard /></div>,
   document.getElementById('root'))