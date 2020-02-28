$(document).ready(function() {

      $( "#prevBtn" ).click(function() {
            window.close();

      });
      $( "#nextBtn" ).click(function() {
            window.print();
            $('html, body').animate({scrollTop:$(document).height()}, 'fast');
      });

    $.getJSON( "/assessment/patient/requestAssessment", {
            patient: patientId,
            assessment: assessmentId
    })
        .done(function(data) {
            let patient = jsonToPatient(data);

            writePatient(patient);
            //Resultado
            $("#resObsFinal").text(patient.assessments[0].getObsResume());
            $("#resBehavior").text(patient.assessments[0].assBehaviorToText());
            patient.assessments[0].getDescBehavior() === "" ? $("#resBehaviorDescriptionLabel").hide() : $("#resBehaviorDescription").text(patient.assessments[0].getDescBehavior());
            $("#resUserFullName").text(patient.assessments[0].getUserName() + " " + patient.assessments[0].getUserLastName());
            $("#resUserOccupation").text(patient.assessments[0].getUserOccupation());
            $("#resUserRegistry").text(patient.assessments[0].getUserRegistry());
        })
        .fail(function() {
            console.log( "error" );
        })
        .always(function() {
            //console.log( "complete" );
        });





});