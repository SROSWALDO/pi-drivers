import loadingGif from "../../assets/formula-gif.gif"
import "./Loading.css"

export default function Loading(props) {



    return(
        <div className="loading-container">
            <div className="box-loading">
            <h2>Loading...</h2>
            <img src={loadingGif} alt="loading..." />

            </div>
            

        </div>

    );
}