import { quiz } from './Quiz';
import Quiz from 'react-quiz-component';



function Quizes() {

    return (
      <div >
          <Quiz quiz={quiz} continueTillCorrect={true}/>
      </div>
      
    );
  }
      
  export default Quizes;