import { expect, test } from "@jest/globals"
import ExternProcessor from "../../../../../app/processors/extern/extern_processor.js"
import InvalidArgumentError from "../../../../../app/utils/invalid_argument_error.js";
import DOMPurify from 'isomorphic-dompurify';

test("Test if extern content with correct input (width and height in pixels) is rendered correctly.", () => {
    let proc = new ExternProcessor();
    let inputUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ";
    let inputArgs = { width: "600px", height: "500px" }
    let expectedOutput = DOMPurify.sanitize(`<iframe width="${inputArgs.width}" height="${inputArgs.height}" src="${inputUrl}"></iframe>`, { ADD_TAGS: ["iframe"] });
    expect(proc.render(inputUrl, inputArgs)).toBe(expectedOutput);
});

test("Test if extern content with correct input (width and height, in percent and auto) is rendered correctly.", () => {
    let proc = new ExternProcessor();
    let inputUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ";
    let inputArgs = { width: "100%", height: "auto" }
    let expectedOutput = DOMPurify.sanitize(`<iframe width="${inputArgs.width}" height="${inputArgs.height}" src="${inputUrl}"></iframe>`, { ADD_TAGS: ["iframe"] });
    expect(proc.render(inputUrl, inputArgs)).toBe(expectedOutput);
});

test("Test if extern content with correct input (width and height, initial and inherit) is rendered correctly.", () => {
    let proc = new ExternProcessor();
    let inputUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ";
    let inputArgs = { width: "initial", height: "inherit" }
    let expectedOutput = DOMPurify.sanitize(`<iframe width="${inputArgs.width}" height="${inputArgs.height}" src="${inputUrl}"></iframe>`, { ADD_TAGS: ["iframe"] });
    expect(proc.render(inputUrl, inputArgs)).toBe(expectedOutput);
});

test("Test if extern content without width and height is rendered correctly.", () => {
    let proc = new ExternProcessor();
    let inputUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ";
    let inputArgs = {}
    let expectedOutput = DOMPurify.sanitize(`<iframe width="420px" height="315px" src="${inputUrl}"></iframe>`, { ADD_TAGS: ["iframe"] });
    expect(proc.render(inputUrl, inputArgs)).toBe(expectedOutput);
});

test("Test if extern content with empty width and height is rendered correctly.", () => {
    let proc = new ExternProcessor();
    let inputUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ";
    let inputArgs = { width: "", height: "" }
    let expectedOutput = DOMPurify.sanitize(`<iframe width="420px" height="315px" src="${inputUrl}"></iframe>`, { ADD_TAGS: ["iframe"] });
    expect(proc.render(inputUrl, inputArgs)).toBe(expectedOutput);
});

test("Test if extern content with undefined width and height is rendered correctly.", () => {
    let proc = new ExternProcessor();
    let inputUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ";
    let inputArgs = { width: undefined, height: undefined }
    let expectedOutput = DOMPurify.sanitize(`<iframe width="420px" height="315px" src="${inputUrl}"></iframe>`, { ADD_TAGS: ["iframe"] });
    expect(proc.render(inputUrl, inputArgs)).toBe(expectedOutput);
});

test("Test if extern content render with an invalid width and height argument throws an error.", () => {
    let proc = new ExternProcessor();
    let inputUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ";
    let inputArgs = { width: "little small", height: "large" }
    expect(() => {
        proc.render(inputUrl, inputArgs)
    }).toThrow(InvalidArgumentError)
});

test("Test if extern content without args is rendered correctly.", () => {
    let proc = new ExternProcessor();
    let inputUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ";
    let expectedOutput = DOMPurify.sanitize(`<iframe width="420px" height="315px" src="${inputUrl}"></iframe>`, { ADD_TAGS: ["iframe"] });
    expect(proc.render(inputUrl)).toBe(expectedOutput);
});

test("Test if extern content render with an invalid url argument throws an error.", () => {
    let proc = new ExternProcessor();
    let inputUrl = "https/www.youtube.com/embed/dQw4w9WgXcQ";
    let inputArgs = { width: "600px", height: "500px" }
    expect(() => {
        proc.render(inputUrl, inputArgs)
    }).toThrow(InvalidArgumentError)
});

test("Test if extern content render with an empty url argument throws an error.", () => {
    let proc = new ExternProcessor();
    let inputUrl = ""
    let inputArgs = { width: "600px", height: "500px" }
    expect(() => {
        proc.render(inputUrl, inputArgs)
    }).toThrow(InvalidArgumentError)
});

test("Test if extern content render with an undefined url argument throws an error.", () => {
    let proc = new ExternProcessor();
    let inputUrl = undefined;
    let inputArgs = { width: "600px", height: "500px" }
    expect(() => {
        proc.render(inputUrl, inputArgs)
    }).toThrow(InvalidArgumentError)
});

test("Test if dirty input is sanitized", () => {
    let proc = new ExternProcessor();
    let inputUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ"onerror=alert(2)';
    let inputArgs = { width: "600px", height: "500px" }
    let expectedOutput = DOMPurify.sanitize(`<iframe width="${inputArgs.width}" height="${inputArgs.height}" src="${inputUrl}"></iframe>`, { ADD_TAGS: ["iframe"] });
    expect(proc.render(inputUrl, inputArgs)).toBe(expectedOutput);
});
