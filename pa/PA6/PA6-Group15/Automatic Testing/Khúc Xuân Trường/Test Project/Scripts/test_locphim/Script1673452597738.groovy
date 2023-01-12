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

WebUI.setText(findTestObject('Object Repository/Page_Home/input_ng nhp_input'), tenphim)

WebUI.click(findTestObject('Object Repository/Page_Home/i_ng nhp_glyphicon glyphicon-search'))

WebUI.selectOptionByValue(findTestObject('Object Repository/Page_/select_Th loi                              _f0beb0'), 
    theloai, true)

WebUI.selectOptionByValue(findTestObject('Object Repository/Page_/select_Quc gia                             _28d27c'), 
    quocgia, true)

WebUI.setText(findTestObject('Object Repository/Page_/input_Vit Nam_year'), nam)

WebUI.click(findTestObject('Object Repository/Page_/button_Lc phim'))

WebUI.verifyTextPresent(kiemtra, false)

