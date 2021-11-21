$(document).on("submit", "form.main-form", function (e) {
    e.preventDefault();

    // get current form object
    var currentForm = $(this);

    // disable submit button
    $("[type=submit]", currentForm).attr("disabled", "disabled");

    // read form data
    let formData = $(this)
        .serializeArray()
        .map(
            function (x) {
                this[x.name] = x.value;
                return this;
            }.bind({})
        )[0];

    // send form data
    axios({
        method: $(this).attr("method"),
        url: $(this).attr("action"),
        data: formData
    })
        .then(function (response) {
            var hand = setTimeout(function () {
                // clear the form if form submitted successfully
                $(currentForm).trigger("reset");

                // show returned success message
                toastr.success("succ")

                // enable submit button again
                $("[type=submit]", currentForm).removeAttr("disabled");
                clearTimeout(hand);
            }, 1000);
        })
        .catch(function (error) {
            // show returned fail message
            toastr.error("fail")

            // enable submit button again
            $("[type=submit]", currentForm).removeAttr("disabled");
        });
});