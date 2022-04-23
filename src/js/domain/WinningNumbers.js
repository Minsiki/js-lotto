import { WinningNumberException } from "../exceptions/WinningNumberException.js";
import LottoNumber from "./LottoNumber.js";

export default class WinningNumbers {
    static validate(winningNumbers, bonusNumber) {
        if (winningNumbers.length < LottoNumber.LOTTO_LENGTH) throw WinningNumberException.notExistWinningNumber();

        if (!bonusNumber) throw WinningNumberException.notExistBonusNumber();

        for (let i = 0; i < winningNumbers.length; i++) {
            if (winningNumbers[i] < LottoNumber.MIN || winningNumbers[i] > LottoNumber.MAX)
                throw WinningNumberException.outOfRangeWinningNumber();
        }

        if (winningNumbers.length !== new Set(winningNumbers).size)
            throw WinningNumberException.duplicateWinningNumber();

        if (winningNumbers.includes(bonusNumber)) throw WinningNumberException.duplicateBonusNumber();

        if (bonusNumber < LottoNumber.MIN || bonusNumber > LottoNumber.MAX)
            throw WinningNumberException.outOfRangeBonusNumber();
    }
}
