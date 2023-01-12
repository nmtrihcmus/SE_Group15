import static com.kms.katalon.core.checkpoint.CheckpointFactory.findCheckpoint
import static com.kms.katalon.core.testcase.TestCaseFactory.findTestCase
import static com.kms.katalon.core.testdata.TestDataFactory.findTestData
import static com.kms.katalon.core.testobject.ObjectRepository.findTestObject
import static com.kms.katalon.core.testobject.ObjectRepository.findWindowsObject
import com.kms.katalon.core.checkpoint.Checkpoint as Checkpoint
import com.kms.katalon.core.cucumber.keyword.CucumberBuiltinKeywords as CucumberKW
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as Mobile
import com.kms.katalon.core.model.FailureHandling as FailureHandling
import com.kms.katalon.core.testcase.TestCase as TestCase
import com.kms.katalon.core.testdata.TestData as TestData
import com.kms.katalon.core.testng.keyword.TestNGBuiltinKeywords as TestNGKW
import com.kms.katalon.core.testobject.TestObject as TestObject
import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WS
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import com.kms.katalon.core.windows.keyword.WindowsBuiltinKeywords as Windows
import internal.GlobalVariable as GlobalVariable
import org.openqa.selenium.Keys as Keys

WebUI.openBrowser('')

WebUI.navigateToUrl('http://localhost:3000/')

WebUI.click(findTestObject('Object Repository/Page_Home/button_ng nhp'))

WebUI.setText(findTestObject('Object Repository/Page_Login/input_ng nhp_username'), 'a')

WebUI.setEncryptedText(findTestObject('Object Repository/Page_Login/input_ng nhp_password'), 'HeCM15nHKBI=')

WebUI.click(findTestObject('Object Repository/Page_Login/button_ng nhp'))

WebUI.setText(findTestObject('Object Repository/Page_Login/input_ng nhp_username'), 'a')

WebUI.setEncryptedText(findTestObject('Object Repository/Page_Login/input_ng nhp_password'), 'HeCM15nHKBI=')

WebUI.click(findTestObject('Object Repository/Page_Login/button_ng nhp'))

WebUI.click(findTestObject('Object Repository/Page_Login/input_ng nhp_username'))

WebUI.click(findTestObject('Object Repository/Page_Login/a_ng k'))

WebUI.setText(findTestObject('Object Repository/Page_Register/input_ng k_username'), '123')

WebUI.setEncryptedText(findTestObject('Object Repository/Page_Register/input_ng k_password'), 'HeCM15nHKBI=')

WebUI.setEncryptedText(findTestObject('Object Repository/Page_Register/input_ng k_repassword'), 'HeCM15nHKBI=')

WebUI.setText(findTestObject('Object Repository/Page_Register/input_ng k_fullname'), 'khuc')

WebUI.setText(findTestObject('Object Repository/Page_Register/input_ng k_email'), 'xuan@gmail.com')

WebUI.click(findTestObject('Object Repository/Page_Register/button_ng k'))

WebUI.click(findTestObject('Object Repository/Page_Register/a_ng nhp'))

WebUI.setText(findTestObject('Object Repository/Page_Login/input_ng nhp_username'), '123')

WebUI.setEncryptedText(findTestObject('Object Repository/Page_Login/input_ng nhp_password'), 'HeCM15nHKBI=')

WebUI.click(findTestObject('Object Repository/Page_Login/button_ng nhp'))

WebUI.click(findTestObject('Object Repository/Page_Home/img_Nng 3 Li Ha Ca Cha_card-img-top'))

WebUI.click(findTestObject('Object Repository/Page_Phim Gi Gi Lm Chiu 2/button_Thm vo danh sch yu thch'))

WebUI.click(findTestObject('Object Repository/Page_Phim Gi Gi Lm Chiu 2/img'))

WebUI.click(findTestObject('Object Repository/Page_Phim Gi Gi Lm Chiu 2/a_Thng tin c nhn'))

WebUI.click(findTestObject('Object Repository/Page_Profile/button_My Favorites'))

WebUI.click(findTestObject('Object Repository/Page_Profile/img_My Favorites_card-img-top'))

WebUI.click(findTestObject('Object Repository/Page_Phim Gi Gi Lm Chiu 2/button_Xa khi danh sch yu thch'))

