import { initTestSeed, kockaDobas } from "./Kocka";

describe('kockaDobas', () => {
    it('rolls a 0 if empty', () => {
        const res = kockaDobas({});
        expect(res).toEqual({ eldobottak: [], kocka: [], max: 0, osszeg: 0, plusz: 0 });
    });
    it('rolls a single die', () => {
        initTestSeed('teszt');
        const res = kockaDobas({ kocka: 10, darab: 1 });
        expect(res.osszeg).toBe(5);
    });
    it('adds plusz', () => {
        initTestSeed('teszt');
        const res = kockaDobas({ kocka: 10, darab: 1, plusz: 4 });
        expect(res.osszeg).toBe(9);
    });
    it('throws away lowest', () => {
        initTestSeed('teszt');
        const res = kockaDobas({ kocka: 10, darab: 5, eldobKicsi: 2 });
        expect(res).toEqual({ "eldobottak": [0, 1], "kocka": [5, 3, 5, 6, 9], max: 10, "osszeg": 20, "plusz": 0 });
    });
    it('throws away highest', () => {
        initTestSeed('teszt');
        const res = kockaDobas({ kocka: 10, darab: 5, eldobNagy: 2 });
        expect(res).toEqual({ "eldobottak": [3, 4], "kocka": [5, 3, 5, 6, 9], max: 10, "osszeg": 13, "plusz": 0 });
    });
})