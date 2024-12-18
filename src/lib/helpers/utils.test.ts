import { it, expect, vi } from 'vitest';
import {
	debounce,
	capitalizeWords,
	capitalizeFirstWord,
	capitalizeFirstWordAndRemoveUnderscode,
	formatDate
} from '$lib/helpers/utils';

it('debounces a function', () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, 100);
    debouncedFunc();
    debouncedFunc();
    debouncedFunc();
    expect(func).not.toHaveBeenCalled();
    setTimeout(() => {
        expect(func).toHaveBeenCalledTimes(1);
    }, 200);
});

it('capitalizes the first letter of each word in a string', () => {
	expect(capitalizeWords('hello world')).toBe('Hello World');
    expect(capitalizeWords('hello')).toBe('Hello');
});

it('capitalizes the first letter of a string', () => {
    expect(capitalizeFirstWord('hello')).toBe('Hello');
    expect(capitalizeFirstWord('Hello')).toBe('Hello');
    expect(capitalizeFirstWord('h')).toBe('H');
    expect(capitalizeFirstWord('')).toBe('');
});

it('capitalizes the first letter and removes underscores from a string', () => {
    expect(capitalizeFirstWordAndRemoveUnderscode('hello_world')).toBe('Hello world');
    expect(capitalizeFirstWordAndRemoveUnderscode('hello_world_test')).toBe('Hello world test');
    expect(capitalizeFirstWordAndRemoveUnderscode('')).toBe('');
});

it('formats a date to dd.mm.yyyy', () => {
    const date = new Date(2023, 9, 5); // 5th October 2023
    expect(formatDate(date)).toBe('05.10.2023');
    const date2 = new Date(2020, 0, 1); // 1st January 2020
    expect(formatDate(date2)).toBe('01.01.2020');
    const date3 = new Date(2023, 11, 31); // 31st December 2023
    expect(formatDate(date3)).toBe('31.12.2023');
});