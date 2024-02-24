import './title.css'

export const Title = ({ children, name }) => {
    return(
        <div className='title'>
            {children}
            <span>{name}</span>
        </div>
    )
}