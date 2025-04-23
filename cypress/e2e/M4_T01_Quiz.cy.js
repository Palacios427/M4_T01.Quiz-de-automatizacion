describe('M4_T01. Quizz de automatizacion', () => {

  beforeEach(() => {
    // Ir al sitio principal
    cy.visit('https://thelab.boozang.com/');

    // Abrir menú
    cy.get('.veggie_burger').click();

    // Verificar que el menú se desplegó
    cy.get('section.navbar.navbar_is_open').should('be.visible');
  });



  it('Speed Game Test', () => {
    // Ir a Speed Game
    cy.contains('a', 'Speed Game').click();
    cy.url().should('include', '/speedGame');

    // Iniciar el juego
    cy.get('button.form_btn.add').should('be.visible').click();

    // Esperar a que aparezca el botón "End Game" (puede tardar hasta 10s)
    cy.get('button.form_btn.delete', { timeout: 12000 }).should('be.visible').click();

    // Verificar que el juego terminó (puedes ajustar el selector o mensaje)
    cy.contains('Succes').should('exist'); 

    cy.wait(5000);
  });

  

  it('Wait Game Test', () => {
    // Ir a Wait Game
    cy.contains('a', 'Wait Game').click();
    cy.url().should('include', '/waitGame');
  
    // Iniciar el juego
    cy.get('button.form_btn.add').should('be.visible').click();
  
    // Esperar exactamente 5 segundos
    cy.wait(5000);
  
    // Hacer clic en "End Game" exactamente después de 5 segundos
    cy.get('button.form_btn.delete').click();
  
    // Verificar el resultado (ajusta si el mensaje cambia)
    cy.contains('Success').should('exist');
    
    cy.wait(5000);
  });
  


  it('Yellow or Blue Test', () => {
    // Ir a Yellow or Blue
    cy.contains('a', 'Yellow or Blue').click();
    cy.url().should('include', '/yellowOrBlue');
  
    // Iniciar el juego
    cy.contains('button', 'Generate Color').click();
  
    // Obtener el texto del color mostrado
    cy.get('h5.color').should('be.visible').then(($el) => {
      const colorText = $el.text().trim().toLowerCase(); // "yellow" o "blue"
  
      // Hacer clic en el botón correspondiente al texto
      cy.get(`button.form_btn.${colorText}`).click();
  
      // Verificar que la respuesta fue correcta
      cy.get('[data-testid="message"]').should('contain.text', 'Success');
    });
    
    cy.wait(5000);
  });



  it('Sorted list - Agregar 2 objetos nuevos a la lista', () => {
    // Ir a Sorted List
    cy.contains('a', 'Sorted list').click();
    cy.url().should('include', '/sortedList');
  
    // Agregar primer item
    cy.get('input[type="text"]').type('Comprar pan');
    cy.contains('button', 'Add todo').click();
  
    // Agregar segundo item
    cy.get('input[type="text"]').type('Pasear al perro');
    cy.contains('button', 'Add todo').click();

    cy.wait(5000);
  });
  


  it('Form Fill - Agregar 2 elementos utilizando fixtures y validar', () => {
    // Ir a Form Fill
    cy.contains('a', 'Form Fill').click();
    cy.url().should('include', '/formFill');
  
    // Cargar los datos desde el fixture
    cy.fixture('usuarios').then((usuarios) => {
      usuarios.forEach((user) => {
        // Llenar el formulario
        cy.get('input[name="firstname"]').clear().type(user.firstname);
        cy.get('input[name="lastname"]').clear().type(user.lastname);
        cy.get('input[name="email"]').clear().type(user.email);
        cy.get('input[name="password"]').clear().type(user.password);
  
        // Guardar en base de datos
        cy.contains('button', 'Save to db').click();
  
        // Verificar mensaje de guardado
        cy.contains('Data saved to DB').should('be.visible');
      });
  
      // Esperar 3 segundos (simula espera al backend)
      cy.wait(3000);
  
      // Mostrar usuarios guardados
      cy.contains('button', 'Show users in db').click();
  
      // Validar que los usuarios aparecen
      usuarios.forEach((user) => {
        cy.contains(user.firstname).should('exist');
        cy.contains(user.lastname).should('exist');
        cy.contains(user.email).should('exist');
      });
    });
    
    cy.wait(5000);
  });  


  it('Cat Shelter - Agregar 2 gatos y asignarles un hogar usando fixtures', () => {
    // Ir a Cat Shelter
    cy.contains('a', 'Cat Shelter').click();
    cy.url().should('include', '/catshelter');
  
    // Cargar nombres desde el fixture
    cy.fixture('gatos').then((gatos) => {
      gatos.forEach((gato, index) => {
        // Ir a agregar gato
        cy.contains('a', 'Add Cat').click();
        cy.url().should('include', '/addcat');
  
        // Escribir el nombre del gato
        cy.get('input[type="text"]').clear().type(gato.name);
  
        // Agregar el gato
        cy.contains('button', 'Add').click();
  
        // Verificar que fue agregado
        cy.contains('li', gato.name).should('exist');
  
        // Asignar hogar haciendo clic en el botón .new_home
        cy.contains('li', gato.name).within(() => {
          cy.get('button.new_home').click();
  
          // Verificar que el ícono o botón cambió
          cy.get('i.fas.fa-home').should('have.attr', 'title', 'Found home');
        });
      });
    });

    cy.wait(5000);
  });
  


  it('Concatenate Strings - Usuario concatena correctamente y envía el string', () => {
    // Visitar la página
    cy.contains('a', 'Concat strings').click();
    cy.url().should('include', '/concatStrings');  
    // Hacer clic en el botón para generar strings
    cy.contains('button', 'Generate string').click();
  
    // Esperar que los strings aparezcan
    cy.get('p.string1').should('exist');
    cy.get('p.string2').should('exist');
  
    // Obtener el texto de los strings y concatenarlos
    cy.get('p.string1').invoke('text').then((str1) => {
      cy.get('p.string2').invoke('text').then((str2) => {
        const resultado = str1 + str2;
  
        // Escribir el string concatenado en el input
        cy.get('input[name="strings"]').type(resultado);
  
        // Verificar que el input tenga el valor correcto
        cy.get('input[name="strings"]').should('have.value', resultado);
  
        // Hacer clic en el botón "Submit string"
        cy.get('button.form_btn.add').contains('Submit string').click();
  
        // Verificar mensaje de éxito
        cy.contains('Success!').should('exist');
      });
    });

    cy.wait(5000);
  });
  

});
