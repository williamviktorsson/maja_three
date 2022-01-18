import { Player } from "./player";
import { Score } from "./score";

export interface Rank {
    index: number;
    leaderboard_id: string; 
    score: Score;
}