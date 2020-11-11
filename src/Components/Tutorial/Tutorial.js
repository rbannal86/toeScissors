import React from "react";

import "./Tutorial.css";

export default function Tutorial() {
  const toSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={"tutorial_main"}>
      <h2 className={"tutorial_title"}>How To Play</h2>
      <div className={"tutorial_header"}>
        <p className={"tutorial_copy"}>
          Welcome to Toe Scissors! Have you ever wanted to play Tic-Tac-Toe and
          Rock Paper Scissors at the same time?
        </p>
        <p className={"tutorial_copy"}>Well, you're in luck!</p>
      </div>
      <div className={"tutorial_table_of_contents"}>
        <h3 className={"tutorial_title"}>Contents</h3>
        <ol className={"tutorial_contents"}>
          <li
            className={"tutorial_contents_item"}
            onClick={() => toSection("tutorial_difficulty")}
          >
            Difficulty
          </li>
          <li
            className={"tutorial_contents_item"}
            onClick={() => toSection("tutorial_making_a_move")}
          >
            Making A Move
          </li>
          <li
            className={"tutorial_contents_item"}
            onClick={() => toSection("tutorial_computer_move")}
          >
            Computer Move
          </li>
          <li
            className={"tutorial_contents_item"}
            onClick={() => toSection("tutorial_winning_a_tile")}
          >
            Winning A Tile
          </li>
          <li
            className={"tutorial_contents_item"}
            onClick={() => toSection("tutorial_breaking_a_tie")}
          >
            Breaking A Tie
          </li>
          <li
            className={"tutorial_contents_item"}
            onClick={() => toSection("tutorial_victory_conditions")}
          >
            Victory Conditions
          </li>
        </ol>
      </div>
      <div className={"tutorial_sections"}>
        <div className={"tutorial_section"} id={"tutorial_difficulty"}>
          <h3 className={"tutorial_title"}>Difficulty</h3>
          <img
            src={"Images/toescissorsmain.png"}
            alt={"Main board with difficulty menu"}
            className={"tutorial_image"}
          />
          <p className={"tutorial_copy"}>
            You have the option to choose your opponent's difficulty. The
            default difficulty is Medium. At this level, the computer will play
            without a plan, but will attempt to prevent you from winning. Hard
            mode keeps the defensive play of Medium, but with a sense of
            direction for the computer. Easy mode features totally random play.
          </p>
          <p className={"tutorial_copy"}>
            All moves that the computer plays in all modes are random.
          </p>
        </div>
        <div className={"tutorial_section"} id={"tutorial_making_a_move"}>
          <h3 className={"tutorial_title"}>Making A Move</h3>
          <div className={"tutorial_move_section"}>
            <img
              src={"Images/rock.png"}
              alt={"Rock"}
              className={"tutorial_move_img"}
            />
            <img
              src={"Images/paper.png"}
              alt={"Paper"}
              className={"tutorial_move_img"}
            />
            <img
              src={"Images/scissors.png"}
              alt={"Scissors"}
              className={"tutorial_move_img"}
            />
          </div>
          <p className={"tutorial_copy"}>
            When you're ready to make your move, click on the tile where you
            want to make your play. Any tile where you haven't played a move is
            available. Click through to select which move you would like to
            make: Rock, Paper, or Scissors. You can click on a new tile to
            change where you are planning to play. Once you've decided where you
            want to play, click the Confirm button.
          </p>
          <img
            src={"Images/toescissorsfirstmove.png"}
            alt={"The user making a move"}
            className={"tutorial_image"}
          />
          <p className={"tutorial_copy"}>
            The computer will make its move at the same time as you. Each turn
            is simultaneous.
          </p>
        </div>
        <div className={"tutorial_section"} id={"tutorial_computer_move"}>
          <h3 className={"tutorial_title"}>Computer Move</h3>
          <p className={"tutorial_copy"}>
            As mentioned previously, the computer will determine its move when
            you submit your move. The move you make will not have an impact on
            the computer's decision.
          </p>
          <img
            src={"Images/toescissorscomputermove.png"}
            alt={"The computer making a move"}
            className={"tutorial_image"}
          />
          <p className={"tutorial_copy"}>
            The computer's random move will be represented by a question mark
            until you challenge it.
          </p>
        </div>
        <div className={"tutorial_section"} id={"tutorial_winning_a_tile"}>
          <h3 className={"tutorial_title"}>Winning A Tile</h3>
          <p className={"tutorial_copy"}>
            When you or the computer chooses a tile where the other player has
            already made a move, the choice of moves will be compared and a
            winner will be determined for that tile. Just like in Rock Paper
            Scissors, rock beats scissors, paper beats rock, and scissors beats
            paper. Once a winner for a tile is determined, that tile is no
            longer available for moves. The winner of that tile will be
            represented by either an X (for the computer) or an O (for the
            user).
          </p>
          <img
            src={"Images/toescissorscontestingtile.png"}
            alt={"Contesting an owned tile"}
            className={"tutorial_image"}
          />
          <p className={"tutorial_copy"}>
            If the moves on a tile match, a tie is declared, which will need to
            be decided before a new round can begin.
          </p>
        </div>
        <div className={"tutorial_section"} id={"tutorial_breaking_a_tie"}>
          <h3 className={"tutorial_title"}>Breaking A Tie</h3>
          <img
            src={"Images/toescissorstie.png"}
            alt={"The tie showdown begins"}
            className={"tutorial_image"}
          />
          <p className={"tutorial_copy"}>
            When a tie is declared, a new section will show up above the game
            board. There, the user will be asked to choose a new move. The
            computer will also make a move. Those moves will then be compared.
            If the moves match again, the tie showdown will continue. Once a
            winner is decided, that tile will change ownership to the winner.
          </p>
          <img
            src={"Images/toescissorstieagain.png"}
            alt={"The tie showdown continues"}
            className={"tutorial_image"}
          />
          <p className={"tutorial_copy"}>
            It is possible for two ties to happen in a round. The tile being
            contested will be highlighted during the tie showdown.
          </p>
          <img
            src={"Images/toescissorstiewinner.png"}
            alt={"The computer wins the tie"}
            className={"tutorial_image"}
          />
        </div>
        <div className={"tutorial_section"} id={"tutorial_victory_conditions"}>
          <h3 className={"tutorial_title"}>Victory Conditions</h3>
          <img
            src={"Images/toescissorsgamewinner.png"}
            alt={"The computer wins"}
            className={"tutorial_image"}
          />
          <p className={"tutorial_copy"}>
            There are two paths to winning. The first is connecting five owned
            OR uncontested tiles horizontally, vertically, or diagonally. The
            other option is to have the most owned tiles when there are no more
            moves to make.
          </p>
          <p className={"tutorial_copy"}>
            The user is also able to forfeit the game and start a new one.
          </p>
        </div>
      </div>
    </div>
  );
}
