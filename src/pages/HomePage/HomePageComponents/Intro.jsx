import './Intro.css'
import handImage from './../../../assets/charity.png'


// This is Intro compnent with greeting and an image
function Intro() {
    return (
        <>
            <div className="vertical-space"></div>
            <div className="vertical-space"></div>
            
            <div className="outer-container">
                <div className="left-container">
                    <h1>Welcome to Chariflow</h1>
                    <p>Chariflow is a simple and powerful donation app that connects people who want to help with those in need. Whether it's for education, health, or community support, Chariflow makes it easy to donate, track your impact, and spread kindness — all in one place.</p>
                </div>

                <div className="right-container">
                    <img src={handImage}></img>
                </div>
                
            </div>
        
        </>
    )
}

export default Intro