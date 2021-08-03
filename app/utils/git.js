import pkg from 'xmlhttprequest'
import learningObjectController from '../controllers/interface/learning_object_controller.js'
import fs from 'fs'
import path from 'path'
import simpleGit from 'simple-git';


const { XMLHttpRequest } = pkg


let pullAndProcessRepository = async function (destination) {
    // Pull Git repos
    const git = simpleGit({ baseDir: destination, binary: 'git' });
    try {
        await git.pull();

    } catch (e) {
        console.log(e)
    }

    // Process Files

    // Check directory recursively for learning-object root-directories
    let checkDirRec = (dir) => {
        let dirCont = fs.readdirSync(dir);
        if (dirCont.some(f => /.*index.md|.*metadata.(md|yaml)/.test(f))) {
            // Process dir
            let files = dirCont.map((f) => {
                return { originalname: f, buffer: fs.readFileSync(path.join(dir, f)) };
            });
            learningObjectController.createLearningObject({ files: files }, {})
        } else {
            dirCont.forEach(f => {
                if (fs.lstatSync(path.join(dir, f)).isDirectory()) {
                    checkDirRec(path.join(dir, f));
                }
            });
        }
    };

    checkDirRec(destination);
}

export { pullAndProcessRepository }