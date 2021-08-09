
let findFile = (filename, files, depth = 0) => {
    let file;
    files.forEach(f => {
        if (f.isDir) {
            if (f.originalname == filename.split("/")[depth]) {
                file = findFile(filename, f.sub, depth + 1);
            }
        } else {
            if (f.originalname == filename.split("/")[depth]) {
                file = f;
            }
        }
    });
    return file;
};

export { findFile }
