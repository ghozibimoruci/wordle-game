import { useRef, useState } from 'preact/hooks';
import { length3 } from './assets/length3';
import { length4 } from './assets/length4';
import { length5 } from './assets/length5';
import './app.css'
import React from 'preact/compat';
import { Hint } from "./hint";

enum DifficultyEnum {
  ez = 3,
  md = 4,
  hr = 5
}

export function App() {
  const [difficulty, setDifficulty] = useState<DifficultyEnum | null>(null);
  const [theWord, setTheWord] = useState<string>("");
  const [renderBox, setRenderBox] = useState<Array<{
    color: string;
    text: string;
  }>[]>([]);
  // renderBox color only contain g = grey, y = yellow, b = black, p = purple
  const [indexAttemp, setIndexAttemp] = useState(1);
  const [isWin, setIsWin] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [onFocusField, setOnFocusField] = useState<boolean>(false);
  const fieldRef = useRef(null);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target){
      const inputValue = (event.target as HTMLInputElement).value;
      (event.target as HTMLInputElement).value = inputValue;
      setInputValue(inputValue.substring(0, difficulty || 0));
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.length == difficulty) {
      isInputValueCorrect();
    }
  };

  const isInputValueCorrect = () => {
    const renderArrayTemp = inputValue.split("").map(
      (char, idx) => (
        {
          text: inputValue[idx].toUpperCase(),
          color: char == theWord[idx] ? "p" : (
            theWord.includes(char) && theWord.split("").filter(
              (w) => w == char
            ).length >= inputValue.split("").filter(
              (w) => w == char
            ).length ? "y" : "b"
          )
        }
      )
    )
    setRenderBox(prev => (
      prev.map((array, idx) => (
        idx == indexAttemp - 1 ? renderArrayTemp : array
      ))
    ))
    setInputValue("");
    if(renderArrayTemp.every(
      (char) => char.color == "p"
    )){
      setIsDone(true);
      setIsWin(true);
    }else if(indexAttemp == 5){
      setIsDone(true);
      setIsWin(false);
    }else{
      setIndexAttemp(indexAttemp+1);
    }
    setInputValue("");
    blurField();
  }

  const setDifficultyAction = ((difficulty: DifficultyEnum) => {
    const selectedDictionary = difficulty == DifficultyEnum.ez ? length3 : difficulty == DifficultyEnum.md ? length4 : length5;
    const randomData = getRandomElement(selectedDictionary);
    const renderBoxArray = Array.from(Array(difficulty).keys()).map(
      _ => ({
        text: " ",
        color: "g"
      })
    );
    setRenderBox(Array.from(Array(5).keys()).map(_ => renderBoxArray));
    setTheWord(randomData);
    setDifficulty(difficulty);
  })

  const resetDifficulty = () => {
    setDifficulty(null);
    setTheWord("");
    setRenderBox([]);
    setIndexAttemp(1);
    setIsWin(false);
    setIsDone(false);
    setInputValue("");
  }

  const focusField = () => {
    if(fieldRef && fieldRef.current){
      (fieldRef.current as HTMLInputElement).focus();
    }
  }

  const blurField = () => {
    if(fieldRef && fieldRef.current){
      (fieldRef.current as HTMLInputElement).blur();
    }
  }

  function getRandomElement<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  return (
    <div className="container m-auto py-4 md:py-6 lg:py-8 px-4">
      <div className={`flex justify-center mb-20${onFocusField?" pb-8 lg:pb-0":""}`}>
        <div className="w-auto relative">
          <h1>Guess Word</h1>
          <div className="absolute start-[100%] top-0">
            <Hint/>
          </div>
        </div>
      </div>
      {
        !difficulty && (
          <div className="fixed md:relative bottom-0 start-0 w-full px-4 pb-4">
            <div className="flex flex-wrap justify-between gap-1">
              <div className="w-full sm:w-auto">
                <button className="btn btn-vite-purple w-full" onClick={() => setDifficultyAction(DifficultyEnum.ez)}>
                  {DifficultyEnum.ez} characters
                </button>
              </div>
              <div className="w-full sm:w-auto">
                <button className="btn btn-vite-purple w-full" onClick={() => setDifficultyAction(DifficultyEnum.md)}>
                  {DifficultyEnum.md} characters
                </button>
              </div>
              <div className="w-full sm:w-auto">
                <button className="btn btn-vite-purple w-full" onClick={() => setDifficultyAction(DifficultyEnum.hr)}>
                  {DifficultyEnum.hr} characters
                </button>
              </div>
            </div>
          </div>
        )
      }
      {
        difficulty && (
          <>
            {
              isDone ? (
                <div className="w-max max-w-full text-center mx-auto flex flex-wrap flex-col items-center">
                  <h2 className="mb-5">
                    {
                      isWin ? "Congratulation!" : "Unfortunately"
                    }
                  </h2>
                  <p className="mb-5">
                    {
                      "Your word is '" + theWord.toUpperCase() + "'. Wanna try again?"
                    }
                  </p>
                  <button className="btn btn-vite-purple" onClick={() => resetDifficulty()}>
                    LETSGO!
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    {
                      renderBox.map(
                        array => (
                          <div className="w-full flex justify-center">
                            <div className="w-auto flex">
                              {
                                array.map(
                                  elm => (
                                    <div className={`
                                    w-[40px] md:w-[40px] lg:w-[60px] 
                                    h-[40px] md:h-[40px] lg:h-[60px] 
                                    text-[40px] md:text-[40px] lg:text-[60px] 
                                    leading-[.85] box ${elm.color} text-white`}>
                                      {
                                        elm.text
                                      }
                                    </div>
                                  )
                                )
                              }
                            </div>
                          </div>
                        )
                      )
                    }
                  </div>
                  <div className={`fixed lg:relative ${onFocusField?"top-0 bg-white shadow-lg lg:shadow-[none]":"bottom-0"} start-0 w-full py-5`}>
                        <div className={`flex flex-wrap justify-center relative w-full pb-4 md:pb-6 gap-5${onFocusField?" flex-col items-center":""}`}>
                            <div className="w-auto">
                              <button className="btn btn-vite-yellow" onClick={() => resetDifficulty()}>
                                I Give Up
                              </button>
                            </div>
                            {
                              onFocusField ? (
                                <div className="w-max h-[40px] md:h-[40px] lg:h-[60px] animate-typing flex items-center">
                                  <span className="text-[40px] md:text-[40px] lg:text-[60px]">{inputValue || " "}</span>
                                </div>
                              ) : (
                                <div className="w-auto">
                                  <button className="btn btn-vite-purple" onClick={() => focusField()}>
                                    Type a Guess
                                  </button>
                                </div>
                              )
                            }
                          <input
                            maxlength={difficulty}
                            type="text" ref={fieldRef}
                            onKeyDown={handleKeyDown}
                            onFocus={() => setOnFocusField(true)}
                            onBlur={() => setOnFocusField(false)}
                            onInput={handleChange} value={inputValue} 
                            className="opacity-0 absolute top-0 left-0"
                          />
                        </div>
                  </div>
                </>
              )
            }
          </>
        )
      }
    </div>
  )
}
