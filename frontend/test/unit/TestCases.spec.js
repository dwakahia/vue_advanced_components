require('jsdom-global')

global.expect = require('expect')

// import Vue from 'vue'
// import {mount} from "@vue/test-utils";
import {expect} from "chai";

const assert = require('assert')
const Vue = require('vue')
const VueTestUtils = require('@vue/test-utils')

import Register from "../../components/auth/register";
import UsersModal from "../../components/users/UsersModal";
import LargeView from "../../components/users/LargeView";
import CustomButton from "../../components/common/CustomButton";
import Login from "../../components/auth/Login";
import BaseLayout from "../../components/auth/BaseLayout";


describe('test cases list', () => {

    const wrapper = VueTestUtils.mount(Register, {
        stubs: ['router-link', 'router-view'],
        components: {
            BaseLayout
        }
    });


    it('test login in form render', async () => {
        const login = VueTestUtils.mount(Login, {
            stubs: ['router-link', 'router-view'],
            components: {
                BaseLayout
            }
        });

        const loginForm = login.find('#loginForm');

        expect(loginForm.isVisible()).to.be.true;

    })

    it('test register password confirmation matches password', async () => {
        await wrapper.find('#password').setValue('secret')
        const password = wrapper.find('#password').element.value;
        await wrapper.find('#confirm_password').setValue('secret')
        const password_confirmation = wrapper.find('#confirm_password').element.value;
        expect(password).to.equal(password_confirmation);
    })

    it('check if registration errors are shown', async () => {
        const form = wrapper.find('form');
        await form.trigger('submit');
        const nameErrorText = wrapper.find('#nameError');
        expect(nameErrorText.isVisible()).to.be.true
    })

    it('remove errors when registration data is valid', async () => {
        const form = wrapper.find('form');
        const nameField = wrapper.find('#name')
        await nameField.setValue('john doe')
        await form.trigger('submit');
        const nameErrorText = wrapper.find('#nameError');
        expect(nameErrorText.exists()).to.be.false
    })

    it('user data table test', async () => {

        const largeView = VueTestUtils.mount(LargeView, {
            components: {
                CustomButton
            }
        });
        const users = [
            {id: 1, name: 'kelvin', email: 'kelvin@gmail.com', dob: '2020-09-19'},
            {id: 2, name: 'dennis', email: 'dennis@gmail.com', dob: '2020-09-19'}
        ];
        await largeView.setProps({'users': users})

        const dataRows = largeView.findAll('.user-list');

        expect(dataRows.length).to.be.eql(2)

    });

    it('test register without errors', async () => {
        await wrapper.find('#name').setValue('paul kamau')
        const name = wrapper.find('#name').element.value;
        await wrapper.find('#email').setValue('kamau@gmail.com')
        const email = wrapper.find('#email').element.value;
        await wrapper.find('#password').setValue('secret')
        const password = wrapper.find('#password').element.value;
        await wrapper.find('#confirm_password').setValue('secret')
        const confirm_password = wrapper.find('#confirm_password').element.value;
        const form = wrapper.find('form');
        await form.trigger('submit');

        expect(name).to.not.be.null
        expect(email).to.not.be.null
        expect(password).to.not.be.null
        expect(confirm_password).to.not.be.null

    })
});