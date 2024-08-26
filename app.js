const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            nuevaFrase: '',
            nuevoAutor: '',
            fraseEditada: { frase: '', autor: '' },
            indiceEditado: null,
            indiceEliminar: null, 
            mensajeAlerta: '',
            autorBusqueda: '', 
            frasesOriginales: [
                {
                    frase: '"No te preocupes si no funciona bien. Si todo estuviera correcto, serías despedido."',
                    autor: "Mosher's Law of Software Engineering"
                },
                {
                    frase: '"Hablar es barato. Muéstrame el código."',
                    autor: 'Linus Torvalds'
                },
                {
                    frase: '"Si en la primera versión de tu software no te avergüenza, es que lo lanzaste demasiado tarde."',
                    autor: 'Reid Hoffman'
                },
                {
                    frase: '"Antes de escribir el código correcto, asegúrate de haber planteado el problema correcto."',
                    autor: 'Steve McConnell'
                },
                {
                    frase: '"El código limpio siempre parece que fue escrito por alguien que se preocupa."',
                    autor: 'Robert C. Martin (Uncle Bob)'
                }
            ]
        };
    },
    computed: {
        
        contadorFrases() {
            return this.frasesFiltradas.length;
        },
        
        frasesFiltradas() {
            if (this.autorBusqueda.trim() === '') {
                return this.frasesOriginales;
            }
            return this.frasesOriginales.filter(frase => 
                frase.autor.toLowerCase().includes(this.autorBusqueda.toLowerCase())
            );
        }
    },
    methods: {
        agregarFrase() {
            // Verificar si los campos de entrada están vacíos
            if (this.nuevaFrase.trim() === '' || this.nuevoAutor.trim() === '') {
                this.mostrarAlerta('Por favor, completa ambos campos antes de añadir una nueva frase.');
                return;
            }

            // Añadir la nueva frase al array
            this.frasesOriginales.unshift({
                frase: this.nuevaFrase,
                autor: this.nuevoAutor
            });

            // Limpiar los campos de entrada después de añadir la frase
            this.nuevaFrase = '';
            this.nuevoAutor = '';
        },
        mostrarAlerta(mensaje) {
            this.mensajeAlerta = mensaje;
            $('#alertaModal').modal('show'); 
        },
        abrirModalEditar(index) {
            this.indiceEditado = index;
            this.fraseEditada = { ...this.frasesOriginales[index] };
            $('#modalEditar').modal('show');
        },
        guardarEdicion() {
            if (this.fraseEditada.frase.trim() === '' || this.fraseEditada.autor.trim() === '') {
                this.mostrarAlerta('Por favor, completa ambos campos antes de guardar los cambios.');
                return;
            }

            // Actualizar la frase en la lista
            this.frasesOriginales[this.indiceEditado] = { ...this.fraseEditada };
            $('#modalEditar').modal('hide');
        },
        eliminarFrase(index) {
            this.indiceEliminar = index;
            $('#confirmarEliminarModal').modal('show');
        },
        confirmarEliminacion() {
            this.frasesOriginales.splice(this.indiceEliminar, 1);
            $('#confirmarEliminarModal').modal('hide');
        }
    }
});

app.mount('#app');
