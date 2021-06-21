import { quiz } from './Quiz';
import Quiz from 'react-quiz-component';
import "./Quiz.scss";



function Quizes() {

    return (
      <div >
          <Quiz quiz={quiz} continueTillCorrect={true} shuffle={true}/>
      </div>
      
    );
  }
      
  export default Quizes;