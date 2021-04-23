$(document).ready(function() {
    const config = {
        apiKey: "AIzaSyABpFZdqjoyG5uTvX_xH_949r2ocsCLsd8",
        authDomain: "hacknow2021.firebaseapp.com",
        projectId: "hacknow2021",
        storageBucket: "hacknow2021.appspot.com",
        messagingSenderId: "190564354731",
        appId: "1:190564354731:web:e1e942f026e95bdb5bc5ee",
        measurementId: "G-7S1LNG1WXE"    
};    
firebase.initializeApp(config); //inicializamos firebase

var filaEliminada; //para capturara la fila eliminada
var filaEditada; //para capturara la fila editada o actualizada
var URLNoedition;
var name_no_edition;
//creamos constantes para los iconos editar y borrar    
const iconoEditar = '<svg class="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>';
const iconoBorrar = '<svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>';

var db = firebase.database();
var coleccionClientes = db.ref().child("Customers");
     
var dataSet = [];//array para guardar los valores de los campos inputs del form
var table = $('#CustomerTable').DataTable({
            pageLength : 10,
            lengthMenu: [[5, 10, 20, -1], [10, 50, 100, 'Todos']],
            data: dataSet,
            columnDefs: [
                {
                    targets: [0], 
                    visible: true,                         
                },
                {
                    targets: -1,        
                    defaultContent: "<div class='wrapper text-center'><div class='btn-group'><button class='btnEditar btn btn-primary' data-toggle='tooltip' title='Editar'>"+iconoEditar+"</button><button class='btnBorrar btn btn-danger' data-toggle='tooltip' title='Borrar'>"+iconoBorrar+"</button></div></div>"
                }
            ]	   
        });

    coleccionClientes.on("child_added", datos => {        
        dataSet = [datos.child("grupo").val(),datos.child("numero_de_cuenta").val(), datos.child("nombre_cliente").val(), datos.child("domicilio").val(),datos.child("colonia").val(),datos.child("poblacion").val(),datos.child("cp").val(),datos.child("telefono1").val(),datos.child("respuestatel1").val(),datos.child("celular").val(),datos.child("respuestacel").val(),datos.child("mail").val(),datos.child("telefono2").val(),datos.child("respuestatel2").val(),datos.child("saldo").val(),datos.child("defectivo").val(),datos.child("ultimopago").val(),datos.child("fechacorte").val(),datos.child("fechaasign").val(),datos.child("gestor").val(),datos.child("status_group").val(),datos.child("precastigo").val(),];
        table.rows.add([dataSet]).draw();
    });
    coleccionClientes.on('child_changed', datos => {
        dataSet = [datos.child("grupo").val(),datos.child("numero_de_cuenta").val(),datos.child("nombre_cliente").val(), datos.child("domicilio").val(),datos.child("colonia").val(),datos.child("poblacion").val(),datos.child("cp").val(),datos.child("telefono1").val(),datos.child("respuestatel1").val(),datos.child("celular").val(),datos.child("respuestacel").val(),datos.child("mail").val(),datos.child("telefono2").val(),datos.child("respuestatel2").val(),datos.child("saldo").val(),datos.child("defectivo").val(),datos.child("ultimopago").val(),datos.child("fechacorte").val(),datos.child("fechaasign").val(),datos.child("gestor").val(),datos.child("status_group").val(),datos.child("precastigo").val(),];
        table.row(filaEditada).data(dataSet).draw();
    });
    coleccionClientes.on("child_removed", function() {
        table.row(filaEliminada.parents('tr')).remove().draw();               
    });



$('form').submit(function(e){   
    e.preventDefault();        
    let grupo = $.trim($('#grupo_valor').val());        
    let numero_de_cuenta = $.trim($('#numero_de_cuenta').val());    
    let nombre_cliente = $.trim($('#nombre_cliente').val());           
    let domicilio = $.trim($('#domicilio').val());      
    let colonia = $.trim($('#colonia').val());   
    let poblacion = $.trim($('#poblacion').val());   
    let cp = $.trim($('#cp').val());   
    let telefono1 = $.trim($('#telefono1').val());   
    let respuestatel1 = $('#respuestatel1').is(":checked");
    let celular = $.trim($('#celular').val());   
    let respuestacel = $('#respuestacel').is(":checked");   
    let mail = $.trim($('#mail').val());   
    let telefono2 = $.trim($('#telefono2').val());   
    let respuestatel2 = $('#respuestatel2').is(":checked()");   
    let saldo = $.trim($('#saldo').val());   
    let defectivo = $.trim($('#defectivo').val());   
    let ultimopago = $.trim($('#ultimopago').val());   
    let fechacorte = $.trim($('#fechacorte').val());   
    let fechaasign = $.trim($('#fechaasign').val());   
    let gestor = $.trim($('#gestor').val());   
    let status_group = $.trim($('#status_group').val());   
    let precastigo = $('#precastigo').is(":checked()");

    data = {
        grupo:grupo,
        numero_de_cuenta:numero_de_cuenta,
        nombre_cliente:nombre_cliente,
        domicilio:domicilio,
        colonia:colonia,
        poblacion:poblacion,
        cp:cp,
        telefono1:telefono1,
        respuestatel1:respuestatel1,
        celular:celular,
        respuestacel:respuestacel,
        mail:mail,
        telefono2:telefono2,
        respuestatel2:respuestatel2,
        saldo:saldo,
        defectivo:defectivo,
        ultimopago:ultimopago,
        fechacorte:fechacorte,
        fechaasign:fechaasign,
        gestor:gestor,
        status_group:status_group,
        precastigo:precastigo
    };
    let idFirebase = numero_de_cuenta;        
    if (idFirebase == ''){                      
         idFirebase = numero_de_cuenta
     };                
    actualizacionData = {};
    actualizacionData[`/${idFirebase}`] = data;
    coleccionClientes.update(actualizacionData);
    id = '';    
    $("form").trigger("reset");
    $('#modalAltaEdicion').modal('hide');
});

//Botones
//Campos que apareceran para incluir nuevo producto
$('#btnNuevo').click(function() {
    $('#grupo_valor').prop('selectedIndex',0);    
    $('#numero_de_cuenta').val('');        
    $('#nombre_cliente').val('');           
    $('#domicilio').val('');      
    $('#colonia').val(''); 
    $('#poblacion').val('');   
    $('#cp').val('');   
    $('#telefono1').val('');   
    $('#respuestatel1').prop("checked", false);  
    $('#celular').val('');   
    $('#respuestacel').prop("checked", false);
    $('#mail').val('');   
    $('#telefono2').val('');   
    $('#respuestatel2').prop("checked", false);
    $('#saldo').val('');   
    $('#defectivo').val('');   
    $('#ultimopago').val('');   
    $('#fechacorte').val('');   
    $('#fechaasign').val('');   
    $('#gestor').val('');   
    $('#status_group').prop('selectedIndex',0);   
    $('#precastigo').prop("checked", false);
    $("form").trigger("reset");
    $('#modalAltaEdicion').modal('show');
});        

//Campos que apareceran para llenar la edición de campos
$("#CustomerTable").on("click", ".btnEditar", function() {    
    filaEditada = table.row($(this).parents('tr'));      
    let fila = $('#CustomerTable').dataTable().fnGetData($(this).closest('tr'));               
    let id = fila[0];
    let grupo_valor = $(this).closest('tr').find('td:eq(0)').text(); 
    let numero_de_cuenta = $(this).closest('tr').find('td:eq(1)').text();        
    let nombre_cliente = $(this).closest('tr').find('td:eq(2)').text(); 
    let domicilio = $(this).closest('tr').find('td:eq(3)').text();   
    let colonia = $(this).closest('tr').find('td:eq(4)').text();    
    let poblacion = $(this).closest('tr').find('td:eq(5)').text();   
    let cp = $(this).closest('tr').find('td:eq(6)').text();    
    let telefono1 =$(this).closest('tr').find('td:eq(7)').text();    
    let respuestatel1 =$(this).closest('tr').find('td:eq(8)').text();
    respuestatel1=='true' ? respuestatel1 = true : respuestatel1 = false;
    let celular = $(this).closest('tr').find('td:eq(9)').text();    
    let respuestacel = $(this).closest('tr').find('td:eq(10)').text();
    respuestacel=='true'? respuestacel = true:respuestacel = false;
    let mail =$(this).closest('tr').find('td:eq(11)').text();  
    let telefono2 =$(this).closest('tr').find('td:eq(12)').text();   
    let respuestatel2 = $(this).closest('tr').find('td:eq(13)').text();
    respuestatel2=='true'? respuestatel2 = true:respuestatel2 = false;
    let saldo = parseFloat($(this).closest('tr').find('td:eq(14)').text());    
    let defectivo = parseFloat($(this).closest('tr').find('td:eq(15)').text());
    let ultimopago =  $(this).closest('tr').find('td:eq(16)').text(); 
    let fechacorte =  parseInt($(this).closest('tr').find('td:eq(17)').text()); 
    let fechaasign =  parseInt($(this).closest('tr').find('td:eq(18)').text());   
    let gestor = $(this).closest('tr').find('td:eq(19)').text();     
    let status_group =  $(this).closest('tr').find('td:eq(20)').text();  
    let precastigo = $(this).closest('tr').find('td:eq(21)').text();  
    precastigo=='true'? precastigo = true: precastigo = false;
    switch(grupo_valor){
        case 'Zona Metropolitana':
           $('#grupo_valor').prop('selectedIndex',0);    
        break
        case 'Interior Republica':
           $('#grupo_valor').prop('selectedIndex',1);    
        break
        default:
            $('#grupo_valor').prop('selectedIndex',0);    
        break
    }
    $('#numero_de_cuenta').val(numero_de_cuenta);        
    $('#nombre_cliente').val(nombre_cliente);           
    $('#domicilio').val(domicilio);      
    $('#colonia').val(colonia); 
    $('#poblacion').val(poblacion);   
    $('#cp').val(cp);   
    $('#telefono1').val(telefono1);   
    $('#respuestatel1').prop("checked", respuestatel1);  
    $('#celular').val(celular);   
    $('#respuestacel').prop("checked", respuestacel);
    $('#mail').val(mail);   
    $('#telefono2').val(telefono2);   
    $('#respuestatel2').prop("checked", respuestatel2);
    $('#saldo').val(saldo);   
    $('#defectivo').val(defectivo);   
    $('#ultimopago').val(ultimopago);   
    $('#fechacorte').val(fechacorte);   
    $('#fechaasign').val(fechaasign);   
    $('#gestor').val(gestor);   
    switch(status_group){
        case 'Ilocalizable':
            $('#status_group').prop('selectedIndex',0);  
        break
        case 'Contactado':
            $('#status_group').prop('selectedIndex',1);  
        break
        case 'Renuente':
            $('#status_group').prop('selectedIndex',2);  
        break
        case 'Convenio de pagos':
            $('#status_group').prop('selectedIndex',3);  
        break
        default:
            $('#status_group').prop('selectedIndex',0);
        break
    }   
    $('#precastigo').prop("checked", precastigo);
    $('#modalAltaEdicion').modal('show');
});  

$("#CustomerTable").on("click", ".btnBorrar", function() {   
    filaEliminada = $(this);
    Swal.fire({
    title: '¿Está seguro de eliminar el producto?',
    text: "¡Está operación no se puede revertir!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Borrar'
    }).then((result) => {
    if (result.value) {            
        let fila = $('#CustomerTable').dataTable().fnGetData($(this).closest('tr'));            
        let id = fila[1];     
        try{
            Swal.fire('¡Eliminado!', 'El producto ha sido eliminado.','success');
            db.ref(`Customers/${id}`).remove();
          }
          catch(e) {
            Swal.fire('¡Error!', 'El producto no fue eliminado','error');
          }
     }
    })        
});  
});