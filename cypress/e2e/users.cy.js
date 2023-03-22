describe('User CRUD Operations', () => {

    beforeEach(() => {
        cy.task('db:erase');
        cy.visit('http://localhost:3000');
    });

    describe('Listagem de usuários', () => {
        it('Validar se um usuário está sendo listado', () => {
            cy.task('db:create:user', {
                name: 'Leozin',
                email: 'leozin@gmail.com',
                password: '12'
            });
            cy.contains('Leozin');
            cy.contains('leozin@gmail.com');
            cy.contains('12');
        });

        it('Validar que a mensagem "No users yet." é exibido quando não existir nenhum usuário no banco de dados', () => {
            cy.visit('http://localhost:3000');

            cy.contains('No User yet');
            cy.contains('Do you want to add one?');
        });

        it('Validar que o botão create é exibido quando não existir nenhum usuário na banco de dados', () => {
            cy.visit('http://localhost:3000');

            cy.get('.RaEmpty-toolbar > .MuiButtonBase-root').should('exist');
        });

        it('Verifica se página atual está selecionada', () => {

            for (let i = 0; i < 20; i++) {
                cy.task('db:create:user', {
                    name: 'Leozin',
                    email: 'leozin@gmail.com',
                    password: '12'
                });
            }

            cy.visit('http://localhost:3000');

            cy.get('.MuiPagination-ul > :nth-child(3) > .MuiButtonBase-root').click();
            cy.get('.MuiPagination-ul > :nth-child(3) > .MuiButtonBase-root').should('have.class', 'Mui-selected');

        });
    });

    describe('Criar um usuário', () => {
        it('Validar a criação de um novo usuário no banco de dados clicando no botão save', () => {
            cy.get('.RaCreateButton-root').click();
            cy.get('#name').type('Leozin');
            cy.get('#email').type('leozin@gmail.com');
            cy.get('#password').type('12');
            cy.get('.RaToolbar-defaultToolbar > .MuiButtonBase-root').click();
    
            cy.contains('Element created');
            cy.contains('Leozin');
            cy.contains('leozin@gmail.com');
            cy.contains('12');
        });

        it('Validar a criação de um novo usuário no banco de dados apertando a tecla enter do teclado', () => {
            cy.get('.RaCreateButton-root').click();
            cy.get('#name').type('Leozin');
            cy.get('#email').type('leozin@gmail.com');
            cy.get('#password').type('12');
            cy.get('.RaToolbar-defaultToolbar > .MuiButtonBase-root').type('{enter}', { force: true });

            cy.contains('Element created');
            cy.contains('Leozin');
            cy.contains('leozin@gmail.com');
            cy.contains('12');
        });
    });

    
    describe('Editar um usuário', () => {
        it('Validar a edição de um usuário existente no banco de dados', () => {
            cy.task('db:create:user', {
                name: 'Leozin',
                email: 'leozin@gmail.com',
                password: '12'
            });
    
            cy.visit('http://localhost:3000');
    
            cy.get('.MuiTableBody-root > :nth-child(1) > .column-id').click();
    
            cy.get('#name').clear().type('Leozinnnnnnn');
            cy.get('#email').clear().type('leozinnnnnn@gmail.com');
            cy.get('#password').clear().type('12121212');
            cy.get('.RaToolbar-defaultToolbar > .MuiButton-contained').click();
    
            cy.contains('Element updated');
            cy.contains('Leozinnnnnnn');
            cy.contains('leozinnnnnn@gmail.com');
            cy.contains('12121212');
        });

        it('Cancelar a edição de um usuário depois de preencher o formulário e clicar no botão "Save"', () => {
            cy.task('db:create:user', {
                name: 'Leozin',
                email: 'leozin@gmail.com',
                password: '12'
            });
    
            cy.visit('http://localhost:3000');
    
            cy.get('.MuiTableBody-root > :nth-child(1) > .column-id').click();
    
            cy.get('#name').clear().type('Leozinnnnnnn');
            cy.get('#email').clear().type('leozinnnnnn@gmail.com');
            cy.get('#password').clear().type('12121212');
            cy.get('.RaToolbar-defaultToolbar > .MuiButton-contained').click();
            cy.get('.MuiSnackbarContent-action > .MuiButtonBase-root').click();

            cy.contains('Element updated');
            cy.contains('Leozin');
            cy.contains('leozin@gmail.com');
            cy.contains('12');
        });
    });

    
    describe('Remover usuário', () => {
        it('Validar a remoção de um usuário no banco de dados', () => {
            cy.task('db:create:user', {
                name: 'Leozin',
                email: 'leozin@gmail.com',
                password: '12'
            });
    
            cy.visit('http://localhost:3000');
    
            cy.get('.MuiTableBody-root > :nth-child(1) > .column-id').click();
            cy.get('.MuiButton-text').click();
    
            cy.contains('No User yet');
    
        });

        it('Cancelar a remoção de um usuário depois de clicar no botão "Delete"', () => {
            cy.task('db:create:user', {
                name: 'Leozin',
                email: 'leozin@gmail.com',
                password: '12'
            });
    
            cy.visit('http://localhost:3000');
    
            cy.get('.MuiTableBody-root > :nth-child(1) > .column-id').click();
            cy.get('.MuiButton-text').click();
            cy.get('.MuiSnackbarContent-action > .MuiButtonBase-root').click();

            cy.contains('Leozin');
            cy.contains('leozin@gmail.com');
            cy.contains('12');
        });

        it('Deletar todos os usuários de uma vez', () => {
            for (let i = 0; i < 20; i++) {
                cy.task('db:create:user', {
                    name: 'Leozin',
                    email: 'leozin@gmail.com',
                    password: '12'
                });
            }

            cy.visit('http://localhost:3000');
            cy.get('.MuiTableHead-root > .MuiTableRow-root > .MuiTableCell-paddingCheckbox > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
            cy.get('[data-test="bulk-actions-toolbar"] > .MuiToolbar-root > .MuiButtonBase-root').click();
            cy.contains('No User yet');
            cy.contains(`20 elements deleted`);
        });

        it('Cancelar a remoção de todos os usuários listados de uma vez', () => {
            for (let i = 0; i < 20; i++) {
                cy.task('db:create:user', {
                    name: 'Leozin',
                    email: 'leozin@gmail.com',
                    password: '12'
                });
            }

            cy.visit('http://localhost:3000');
            cy.get('.MuiTableHead-root > .MuiTableRow-root > .MuiTableCell-paddingCheckbox > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
            cy.get('[data-test="bulk-actions-toolbar"] > .MuiToolbar-root > .MuiButtonBase-root').click();
            cy.get('.MuiSnackbarContent-action > .MuiButtonBase-root').click();
            cy.contains('No User yet').should('not.exist');
        });
    });

});