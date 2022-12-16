import { defineRule } from 'vee-validate';
import {email, min } from '@vee-validate/rules';
defineRule('email', email);
defineRule('min', min);


defineRule('required', value => {
    if (!value || !value.length) {
        return 'This field is required';
    }
    return true;
});

defineRule('pwdlen', value => {
    if (value.length < 6) {
        return 'Password should be at least 6 characters';
    }
    return true;
});
