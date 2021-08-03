import { expect, test } from "@jest/globals"
import TextProcessor from "../../../../../app/processors/text/text_processor.js"
import InvalidArgumentError from "../../../../../app/utils/invalid_argument_error.js";
import DOMPurify from 'isomorphic-dompurify';

test("Test if text with correct input is rendered correctly", () => {
    let proc = new TextProcessor();
    let input = 'Dit is text.';
    let expectedOutput = DOMPurify.sanitize(input)
    expect(proc.render(input)).toBe(expectedOutput);
});

test("Test if text with empty input is rendered correctly", () => {
    let proc = new TextProcessor();
    let input = "";
    let expectedOutput = DOMPurify.sanitize(input)
    expect(proc.render(input)).toBe(expectedOutput);
});

test("Test if text with undefined input is rendered correctly", () => {
    let proc = new TextProcessor();
    let input = undefined;
    let expectedOutput = DOMPurify.sanitize(input)
    expect(proc.render(input)).toBe(expectedOutput);
});

test("Test if dirty input is sanitized", () => {
    let proc = new TextProcessor();
    let input = 'Dit is text. <p onerror=alert(2)></p>';
    let expectedOutput = DOMPurify.sanitize(input)
    expect(proc.render(input)).toBe(expectedOutput);
});