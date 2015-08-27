import mustache from 'mustache';

export function replace(contents, values) {
    const commentPrototype = findCommentPrototype(contents)
    if (!commentPrototype) {
        throw 'Missing comment prototype';
    }

    const inputLines = contents.split(/\n/);
    const outputLines = inputLines.map(line => {
        const replacementPrototype = findReplacementPrototype(line, commentPrototype);
        if (replacementPrototype) {
            return replacedLine(line, values, replacementPrototype, commentPrototype);
        }
        else {
            return line;
        }
    });

    return outputLines.join('\n');
}

function findCommentPrototype(contents) {
    const match = contents.match(/\s*(.*)MT-COMMENT(.*)\s*/i);
    if (match) {
        return {
            prefix: match[1],
            postfix: match[2]
        };
    }
}

function findReplacementPrototype(line, commentPrototype) {
    const pattern = `${commentPrototype.prefix}MT-REPLACE:\\s*(.*)\\s*${commentPrototype.postfix}`;
    const regex = new RegExp(pattern, 'i');
    const match = line.match(regex);
    if (match) {
        return match[1];
    }
}

function replacedLine(line, values, replacementPrototype, commentPrototype) {
    const pattern = `(\\s*).*?(\\s*)(${commentPrototype.prefix}.*${commentPrototype.postfix})`;
    const regex = new RegExp(pattern, 'i');
    const match = line.match(regex);
    if (match) {
        const leadingWhitespace = match[1];
        const trailingWhitespace = match[2];
        const comment = match[3]

        const replacementString = mustache.render(replacementPrototype, values);

        return leadingWhitespace + replacementString + trailingWhitespace + comment;
    }
}
