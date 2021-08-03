import { expect, test } from "@jest/globals"
import AudioProcessor from "../../../../../app/processors/audio/audio_processor.js"
import InvalidArgumentError from "../../../../../app/utils/invalid_argument_error.js";
import DOMPurify from 'isomorphic-dompurify';

test("Test if audio with correct input is rendered correctly.", () => {
    let proc = new AudioProcessor();
    let inputUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
    let inputArgs = { type: "audio/mpeg" }
    let expectedOutput = DOMPurify.sanitize(`<audio controls>
                <source src="${inputUrl}" type=${inputArgs.type}>
                Your browser does not support the audio element.
                </audio>`);
    expect(proc.render(inputUrl, inputArgs)).toBe(expectedOutput);
});

test("Test if audio render without type argument throws an error.", () => {
    let proc = new AudioProcessor();
    let inputUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
    let inputArgs = {}
    expect(() => {
        proc.render(inputUrl, inputArgs)
    }).toThrow(InvalidArgumentError)
});

test("Test if audio render with an invalid type argument throws an error.", () => {
    let proc = new AudioProcessor();
    let inputUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
    let inputArgs = { type: "image/image" }
    expect(() => {
        proc.render(inputUrl, inputArgs)
    }).toThrow(InvalidArgumentError)
});

test("Test if audio render with an empty type argument throws an error.", () => {
    let proc = new AudioProcessor();
    let inputUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
    let inputArgs = { type: "" }
    expect(() => {
        proc.render(inputUrl, inputArgs)
    }).toThrow(InvalidArgumentError)
});

test("Test if audio render with an undefined type argument throws an error.", () => {
    let proc = new AudioProcessor();
    let inputUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
    let inputArgs = { type: undefined }
    expect(() => {
        proc.render(inputUrl, inputArgs)
    }).toThrow(InvalidArgumentError)
});

test("Test if audio render without args throws an error.", () => {
    let proc = new AudioProcessor();
    let inputUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
    expect(() => {
        proc.render(inputUrl)
    }).toThrow(InvalidArgumentError)
});

test("Test if audio render without an url throws an error.", () => {
    let proc = new AudioProcessor();
    let inputUrl = "";
    let inputArgs = { type: "audio/mpeg" }
    expect(() => {
        proc.render(inputUrl, inputArgs)
    }).toThrow(InvalidArgumentError)
});

test("Test if audio render with an invalid url throws an error.", () => {
    let proc = new AudioProcessor();
    let inputUrl = "https/www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
    let inputArgs = { type: "audio/mpeg" }
    expect(() => {
        proc.render(inputUrl, inputArgs)
    }).toThrow(InvalidArgumentError)
});

test("Test if audio render with an undefined url throws an error.", () => {
    let proc = new AudioProcessor();
    let inputUrl = undefined;
    let inputArgs = { type: "audio/mpeg" }
    expect(() => {
        proc.render(inputUrl, inputArgs)
    }).toThrow(InvalidArgumentError)
});

test("Test if dirty input is sanitized", () => {
    let proc = new AudioProcessor();
    let inputUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"onerror=alert(1)';
    let inputArgs = { type: "audio/mpeg" }
    let expectedOutput = DOMPurify.sanitize(`<audio controls>
                <source src="${inputUrl}" type=${inputArgs.type}>
                Your browser does not support the audio element.
                </audio>`);
    console.log(expectedOutput);
    expect(proc.render(inputUrl, inputArgs)).toBe(expectedOutput);
});