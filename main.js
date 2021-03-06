module.exports = babel => {
    const t = babel.types;

    function addPragmaImport(path, state) {
        const importDeclaration = t.importDeclaration(
            [t.importSpecifier(t.identifier(state.opts.name), t.identifier(state.opts.name))],
            t.stringLiteral(state.opts.path)
        );
        path.get('body')[0].insertBefore(importDeclaration);
    }

    return {
        pre() {
            if (!(this.opts.path && this.opts.name)) {
                throw new Error('You must specify `module` and `import`');
            }
        },
        visitor: {
            Program: {
                exit(path, state) {
                    if (!state.get('jsxDetected')) return;
                    if (path.node.body) {
                        const exit = path.node.body.findIndex(b => {
                            if (b.type === 'ImportDeclaration') {
                                return (
                                    b.specifiers.findIndex(spec => {
                                        if (spec.type === 'ImportDefaultSpecifier' || spec.type === 'ImportSpecifier') {
                                            return spec.local.name === state.opts.name;
                                        }
                                        return false;
                                    }) > -1
                                );
                            }
                            return false;
                        });
                        if (exit > -1) {
                            return;
                        }
                    }
                    addPragmaImport(path, state);
                }
            },
            JSXElement(path, state) {
                state.set('jsxDetected', true);
            }
        }
    };
};
