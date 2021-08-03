import { expect, test } from "@jest/globals"
import PdfProcessor from "../../../../../app/processors/pdf/pdf_processor.js"
import InvalidArgumentError from "../../../../../app/utils/invalid_argument_error.js";
import DOMPurify from 'isomorphic-dompurify';




test("Test if pdf with correct input (width and height in pixels) is rendered correctly.", () => {
    let proc = new PdfProcessor();
    let inputUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
    let inputArgs = { width: "600px", height: "500px" }
    let expectedOutput = DOMPurify.sanitize(`<embed src="${inputUrl}" type="application/pdf" width="${inputArgs.width}" height="${inputArgs.height}""/>`, { ADD_TAGS: ["embed"] })
    expect(proc.render(inputUrl, inputArgs)).toBe(expectedOutput);
});

test("Test if pdf with correct input (width and height, auto and initial) is rendered correctly.", () => {
    let proc = new PdfProcessor();
    let inputUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
    let inputArgs = { width: "auto", height: "initial" }
    let expectedOutput = DOMPurify.sanitize(`<embed src="${inputUrl}" type="application/pdf" width="${inputArgs.width}" height="${inputArgs.height}""/>`, { ADD_TAGS: ["embed"] })
    expect(proc.render(inputUrl, inputArgs)).toBe(expectedOutput);
});

test("Test if pdf with correct input (width and height, inherit and in %) is rendered correctly.", () => {
    let proc = new PdfProcessor();
    let inputUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
    let inputArgs = { width: "75%", height: "inherit" }
    let expectedOutput = DOMPurify.sanitize(`<embed src="${inputUrl}" type="application/pdf" width="${inputArgs.width}" height="${inputArgs.height}""/>`, { ADD_TAGS: ["embed"] })
    expect(proc.render(inputUrl, inputArgs)).toBe(expectedOutput);
});


test("Test if pdf without width and height is rendered correctly with default values.", () => {
    let proc = new PdfProcessor();
    let inputUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
    let inputArgs = {}
    let expectedOutput = DOMPurify.sanitize(`<embed src="${inputUrl}" type="application/pdf" width="100%" height="800px""/>`, { ADD_TAGS: ["embed"] })
    expect(proc.render(inputUrl, inputArgs)).toBe(expectedOutput);
});

test("Test if pdf with empty width and height is rendered correctly with default values.", () => {
    let proc = new PdfProcessor();
    let inputUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
    let inputArgs = { width: "", height: "" }
    let expectedOutput = DOMPurify.sanitize(`<embed src="${inputUrl}" type="application/pdf" width="100%" height="800px""/>`, { ADD_TAGS: ["embed"] })
    expect(proc.render(inputUrl, inputArgs)).toBe(expectedOutput);
});

test("Test if pdf with undefined width and height is rendered correctly with default values.", () => {
    let proc = new PdfProcessor();
    let inputUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
    let inputArgs = { width: undefined, height: undefined }
    let expectedOutput = DOMPurify.sanitize(`<embed src="${inputUrl}" type="application/pdf" width="100%" height="800px""/>`, { ADD_TAGS: ["embed"] })
    expect(proc.render(inputUrl, inputArgs)).toBe(expectedOutput);
});

test("Test if pdf render with an invalid width and height argument throws an error.", () => {
    let proc = new PdfProcessor();
    let inputUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
    let inputArgs = { width: "very big", height: "bigger" }
    expect(() => {
        proc.render(inputUrl, inputArgs)
    }).toThrow(InvalidArgumentError)
});

test("Test if pdf without args is rendered correctly with default values for width and height.", () => {
    let proc = new PdfProcessor();
    let inputUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
    let expectedOutput = DOMPurify.sanitize(`<embed src="${inputUrl}" type="application/pdf" width="100%" height="800px""/>`, { ADD_TAGS: ["embed"] })
    expect(proc.render(inputUrl)).toBe(expectedOutput);
});

test("Test if pdf with an invalid url argument throws an error.", () => {
    let proc = new PdfProcessor();
    let inputUrl = "https/www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
    let inputArgs = { width: "600px", height: "500px" }
    expect(() => {
        proc.render(inputUrl, inputArgs)
    }).toThrow(InvalidArgumentError)
});

test("Test if pdf with an empty url argument throws an error.", () => {
    let proc = new PdfProcessor();
    let inputUrl = "";
    let inputArgs = { width: "600px", height: "500px" }
    expect(() => {
        proc.render(inputUrl, inputArgs)
    }).toThrow(InvalidArgumentError)
});

test("Test if pdf with an undefined url argument throws an error.", () => {
    let proc = new PdfProcessor();
    let inputUrl = undefined;
    let inputArgs = { width: "600px", height: "500px" }
    expect(() => {
        proc.render(inputUrl, inputArgs)
    }).toThrow(InvalidArgumentError)
});

test("Test if dirty input is sanitized", () => {
    let proc = new PdfProcessor();
    let inputUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"onerror=alert(1)';
    let inputArgs = { width: "600px", height: "500px" }
    let expectedOutput = DOMPurify.sanitize(`<embed src="${inputUrl}" type="application/pdf" width="${inputArgs.width}" height="${inputArgs.height}""/>`, { ADD_TAGS: ["embed"] })

    expect(proc.render(inputUrl, inputArgs)).toBe(expectedOutput);
});
