import classes  from './index.module.css'

function Header(){
  return(
    <div className={classes.header}>
      <div className={classes.left}>测试页面</div>
      <div className={classes.right}></div>
    </div>
  )
}

export default Header